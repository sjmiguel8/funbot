import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const POSTS_TABLE = 'PostsInfrastructureStack-PostsTableC82B36F0-UZETHU5OVEYC';

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
            throw new Error(`Unknown field: ${fieldName}`);
        }
    } catch (error) {
        console.error('Operation error:', error);
        throw error;
    }
};

async function getPosts() {
    const params = {
        TableName: POSTS_TABLE,
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Could not fetch posts');
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
        await dynamoDB.put(params).promise();
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Could not create post');
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
        const result = await dynamoDB.update(params).promise();
        return result.Attributes;
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Could not update post');
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
        await dynamoDB.delete(params).promise();
        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Could not delete post');
    }
} 