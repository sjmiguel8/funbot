import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient();
const POSTS_TABLE = 'PostsInfrastructureStack-PostsTableC82B36F0-UZETHU5OVEYC';

export const handler = async (event: any) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    const fieldName = event.fieldName;

    try {
        if (fieldName === 'getPosts') {
            return await getPosts();
        } else if (fieldName === 'createPost') {
            return await createPost(event.arguments.input);
        } else if (fieldName === 'updatePost') {
            return await updatePost(event.arguments.id, event.arguments.input);
        } else if (fieldName === 'deletePost') {
            return await deletePost(event.arguments.id);
        } else {
            console.error('No token found in session. Please log in again.');
            throw new Error('Authentication required. Please log in.');
        }
    } catch (err) {
        console.error('Authentication error:', err);
        if (err instanceof Error) {
            throw new Error(`Authentication failed: ${err.message}. Please check your credentials.`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

async function getPosts() {
    const params = {
        TableName: POSTS_TABLE,
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        if (!result.Items) {
            console.error('Unexpected result type received.');
            throw new Error('Unexpected result type.');
        }
        return result.Items;
    } catch (err) {
        console.error('GraphQL Error Details:', {
          message: err.message,
          stack: err.stack
        });
        throw new Error(`Failed to get posts: ${err.message}.`);
    }
}

interface PostInput {
    content: string;
    authorId: string;
    authorName: string;
}

async function createPost(input: PostInput) {
    if (!input || !input.content || !input.authorId || !input.authorName) {
        throw new Error('Missing required fields');
    }

    const post = {
        id: Date.now().toString(),
        content: input.content,
        authorId: input.authorId,
        authorName: input.authorName,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0
    };

    const params = {
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

async function updatePost(id: string, input: any) {
    if (!id || !input.content) {
        throw new Error('Post ID and content are required');
    }

    const params = {
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
        return result.Attributes;
    } catch (err) {
        console.error('Failed to update post:', err);
        throw new Error('Failed to update post. Please try again later.');
    }
}

async function deletePost(id: string) {
    if (!id) {
        throw new Error('Post ID is required');
    }

    const params = {
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