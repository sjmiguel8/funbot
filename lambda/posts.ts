import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient();
const POSTS_TABLE = 'PostsInfrastructureStack-PostsTableC82B36F0-UZETHU5OVEYC';

interface AppSyncEvent {
    fieldName: string;
    arguments: {
        id?: string;
        input?: PostInput;
    };
}

interface PostInput {
    content: string;
    authorId: string;
    authorName: string;
}

interface Post extends PostInput {
    id: string;
    timestamp: string;
    likes: number;
    comments: number;
}

async function getPosts(): Promise<Post[]> {
    const params = {
        TableName: POSTS_TABLE
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items as Post[];
    } catch (err) {
        console.error('GraphQL Error Details:', {
            message: (err as Error).message,
            stack: (err as Error).stack
        });
        throw new Error(`Failed to get posts: ${(err as Error).message}`);
    }
}

async function createPost(input: PostInput): Promise<Post> {
    if (!input || !input.content || !input.authorId || !input.authorName) {
        throw new Error('Missing required fields');
    }

    const post: Post = {
        id: Date.now().toString(),
        content: input.content,
        authorId: input.authorId,
        authorName: input.authorName,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: POSTS_TABLE,
        Item: post
    };

    try {
        await dynamoDB.put(params).promise();
        return post;
    } catch (err) {
        console.error('Failed to create post:', err);
        throw new Error('Failed to create post. Please try again later.');
    }
}

async function updatePost(id: string, input: Partial<PostInput>): Promise<Post> {
    if (!id || !input.content) {
        throw new Error('Post ID and content are required');
    }

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: POSTS_TABLE,
        Key: { id },
        UpdateExpression: 'SET content = :content',
        ExpressionAttributeValues: {
            ':content': input.content
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const result = await dynamoDB.update(params).promise();
        return result.Attributes as Post;
    } catch (err) {
        console.error('Failed to update post:', err);
        throw new Error('Failed to update post. Please try again later.');
    }
}

async function deletePost(id: string): Promise<boolean> {
    if (!id) {
        throw new Error('Post ID is required');
    }

    const params: DynamoDB.DocumentClient.DeleteItemInput = {
        TableName: POSTS_TABLE,
        Key: { id }
    };

    try {
        await dynamoDB.delete(params).promise();
        return true;
    } catch (err) {
        console.error('Failed to delete post:', err);
        throw new Error('Failed to delete post. Please try again later.');
    }
}

export const handler = async (event: AppSyncEvent): Promise<Post | Post[] | boolean> => {
    console.log('Event:', JSON.stringify(event, null, 2));

    try {
        switch (event.fieldName) {
            case 'getPosts':
                return await getPosts();
            
            case 'createPost':
                if (!event.arguments.input) {
                    throw new Error('Post input is required');
                }
                return await createPost(event.arguments.input);
            
            case 'updatePost':
                if (!event.arguments.id || !event.arguments.input) {
                    throw new Error('Post ID and input are required');
                }
                return await updatePost(event.arguments.id, event.arguments.input);
            
            case 'deletePost':
                if (!event.arguments.id) {
                    throw new Error('Post ID is required');
                }
                return await deletePost(event.arguments.id);
            
            default:
                throw new Error(`Unhandled field name: ${event.fieldName}`);
        }
    } catch (err) {
        console.error('Operation error:', err);
        if (err instanceof Error) {
            throw new Error(`Operation failed: ${err.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
