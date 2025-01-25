import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Amplify from 'aws-amplify';
import awsconfig from './infrastructure/src/aws-exports';
import { getPosts } from './graphql/queries'; // Adjust the path as necessary

Amplify.configure(awsconfig);

const client = new DynamoDB({});
const dynamoDB = DynamoDBDocument.from(client);
const POSTS_TABLE = 'PostsInfrastructureStack-PostsTableC82B36F0-UZETHU5OVEYC';

function logError(error) {
    console.error('An error occurred:', error);
}

export const handler = async (event) => {
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
            throw new Error(`Unknown field: ${fieldName}. Please check your request.`);
        }
    } catch (error) {
        logError(error);
        throw error;
    }
};

async function getPosts() {
    const params = {
        TableName: POSTS_TABLE,
    };

    try {
        const result = await dynamoDB.scan(params);
        return result.Items;
    } catch (error) {
        logError(error);
        throw new Error('Could not fetch posts. Please try again later.');
    }
}

async function createPost(input) {
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
        await dynamoDB.put(params);
        return post;
    } catch (error) {
        logError(error);
        throw new Error('Could not create post. Please try again later.');
    }
}

async function updatePost(id, input) {
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
        const result = await dynamoDB.update(params);
        return result.Attributes;
    } catch (error) {
        logError(error);
        throw new Error('Could not update post. Please try again later.');
    }
}

async function deletePost(id) {
    if (!id) {
        throw new Error('Post ID is required');
    }

    const params = {
        TableName: POSTS_TABLE,
        Key: { id }
    };

    try {
        await dynamoDB.delete(params);
        return true;
    } catch (error) {
        logError(error);
        throw new Error('Could not delete post. Please try again later.');
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };
    return config;
  },
};

module.exports = nextConfig;