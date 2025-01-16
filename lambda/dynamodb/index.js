import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const tableName = process.env.POSTS_TABLE;

  try {
    switch (event.info.fieldName) {
      case 'getPosts':
        const scanResult = await docClient.send(
          new QueryCommand({
            TableName: tableName,
            ScanIndexForward: false,
          })
        );
        return scanResult.Items;

      case 'createPost':
        const { input } = event.arguments;
        const post = {
          id: Date.now().toString(),
          content: input.content,
          authorId: input.authorId,
          authorName: input.authorName,
          timestamp: new Date().toISOString(),
          likes: 0,
          comments: 0,
          attachments: input.attachments || [],
        };

        await docClient.send(
          new PutCommand({
            TableName: tableName,
            Item: post,
          })
        );
        return post;

      case 'updatePost':
        const { id, input: updateInput } = event.arguments;
        const updateResult = await docClient.send(
          new GetCommand({
            TableName: tableName,
            Key: { id },
          })
        );
        
        if (!updateResult.Item) {
          throw new Error('Post not found');
        }

        const updatedPost = {
          ...updateResult.Item,
          ...updateInput,
        };

        await docClient.send(
          new PutCommand({
            TableName: tableName,
            Item: updatedPost,
          })
        );
        return updatedPost;

      case 'deletePost':
        const { id: deleteId } = event.arguments;
        await docClient.send(
          new DeleteCommand({
            TableName: tableName,
            Key: { id: deleteId },
          })
        );
        return true;

      default:
        throw new Error('Unknown field, unable to resolve ' + event.info.fieldName);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 