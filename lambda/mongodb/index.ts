import { MongoClient, ObjectId } from 'mongodb';
import { AppSyncResolverHandler } from 'aws-lambda';

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(process.env.MONGODB_DB);
  cachedDb = db;
  return db;
}

export const handler: AppSyncResolverHandler<any, any> = async (event) => {
  const db = await connectToDatabase();
  const collection = db.collection('posts');

  switch (event.info.fieldName) {
    case 'getPosts':
      return await collection.find().sort({ timestamp: -1 }).toArray();

    case 'createPost':
      const post = {
        ...event.arguments.input,
        authorId: (event.identity && 'sub' in event.identity) ? event.identity.sub : '',
        authorName: (event.identity && 'username' in event.identity) ? event.identity.username : '',
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };
      const result = await collection.insertOne(post);
      return { ...post, id: result.insertedId.toString() };

    case 'updatePost':
      const updatedPost = await collection.findOneAndUpdate(
        { _id: new ObjectId(event.arguments.id), authorId: event.identity && 'sub' in event.identity ? event.identity.sub : '' },
        { $set: event.arguments.input },
        { returnDocument: 'after' }
      );
      return updatedPost.value;

    case 'deletePost':
      const deleteResult = await collection.deleteOne({
        _id: new ObjectId(event.arguments.id),
        authorId: (event.identity && 'sub' in event.identity) ? event.identity.sub : '',
      });
      return deleteResult.deletedCount === 1;

    default:
      throw new Error('Unknown field, unable to resolve ' + event.info.fieldName);
  }
}; 