import { MongoClient, ObjectId, Db, Document } from 'mongodb';
import { AppSyncResolverHandler } from 'aws-lambda';
import { AppSyncIdentityCognito } from 'aws-lambda/trigger/appsync-resolver';

interface PostInput {
  content: string;
  attachments?: Array<{ type: string; url: string }>;
}

interface MongoPost extends PostInput {
  _id: ObjectId;
  authorId: string;
  authorName: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface Post extends PostInput {
  id: string;
  authorId: string;
  authorName: string;
  timestamp: string;
  likes: number;
  comments: number;
}

type UpdateFields = Partial<Pick<MongoPost, 'content' | 'attachments'>>;

let cachedDb: Db | null = null;
let client: MongoClient | null = null;

async function connectToDatabase(): Promise<Db> {
  try {
    if (cachedDb) {
      return cachedDb;
    }

    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
      throw new Error('Required environment variables MONGODB_URI and MONGODB_DB are not set');
    }

    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

async function closeConnection(): Promise<void> {
  try {
    if (client) {
      await client.close();
      cachedDb = null;
      client = null;
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

function transformMongoPost(post: MongoPost): Post {
  const { _id, ...rest } = post;
  return { id: _id.toString(), ...rest };
}

export const handler: AppSyncResolverHandler<{ input?: PostInput; id?: string }, Post | Post[] | boolean> = async (event) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<MongoPost>('posts');
    const identity = event.identity as AppSyncIdentityCognito | undefined;

    if (!identity?.sub) {
      throw new Error('Authentication required');
    }

    try {
      switch (event.info.fieldName) {
        case 'getPosts': {
          const posts = await collection.find().sort({ timestamp: -1 }).toArray();
          return posts.map(transformMongoPost);
        }

        case 'createPost': {
          if (!event.arguments.input) {
            throw new Error('Input is required for createPost');
          }

          const post: Omit<MongoPost, '_id'> = {
            ...event.arguments.input,
            authorId: identity.sub,
            authorName: identity.username || 'Anonymous',
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
          };

          const result = await collection.insertOne(post as MongoPost);
          return {
            ...post,
            id: result.insertedId.toString()
          } as Post;
        }

        case 'updatePost': {
          if (!event.arguments.id || !event.arguments.input) {
            throw new Error('ID and input are required for updatePost');
          }

          const updateFields: UpdateFields = {};
          if (event.arguments.input.content) {
            updateFields.content = event.arguments.input.content;
          }
          if (event.arguments.input.attachments) {
            updateFields.attachments = event.arguments.input.attachments;
          }

          if (Object.keys(updateFields).length === 0) {
            throw new Error('No valid fields to update');
          }

          const result = await collection.findOneAndUpdate(
            { 
              _id: new ObjectId(event.arguments.id), 
              authorId: identity.sub 
            },
            { $set: updateFields },
            { 
              returnDocument: 'after',
              upsert: false
            }
          ) as Document | null;

          if (!result) {
            throw new Error('Post not found or not authorized to update');
          }

          return transformMongoPost(result as MongoPost);
        }

        case 'deletePost': {
          if (!event.arguments.id) {
            throw new Error('ID is required for deletePost');
          }

          const deleteResult = await collection.deleteOne({
            _id: new ObjectId(event.arguments.id),
            authorId: identity.sub,
          });

          if (deleteResult.deletedCount === 0) {
            throw new Error('Post not found or not authorized to delete');
          }

          return true;
        }

        default:
          throw new Error(`Unknown field, unable to resolve ${event.info.fieldName}`);
      }
    } finally {
      await closeConnection();
    }
  } catch (error) {
    console.error('Operation error:', error);
    if (error instanceof Error) {
      throw new Error(`Operation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
