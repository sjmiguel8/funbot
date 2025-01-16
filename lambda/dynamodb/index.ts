import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand, ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { AppSyncResolverHandler } from 'aws-lambda';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const TABLE_NAME = process.env.POSTS_TABLE!;

export const handler: AppSyncResolverHandler<any, any> = async (event) => {
  switch (event.info.fieldName) {
    case 'getPosts':
      return await getPosts();
    case 'createPost':
      return await createPost(event.arguments.input);
    case 'updatePost':
      return await updatePost(event.arguments.id, event.arguments.input);
    case 'deletePost':
      return await deletePost(event.arguments.id);
    default:
      throw new Error('Unknown field, unable to resolve ' + event.info.fieldName);
  }
};

async function getPosts() {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const result = await client.send(command);
  return result.Items;
}

async function createPost(input: any) {
  const post = {
    id: input.id,
    content: input.content,
    authorId: input.authorId,
    authorName: input.authorName,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    attachments: input.attachments,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: post,
  });
  
  await client.send(command);
  return post;
}

async function updatePost(id: string, content: string) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
    UpdateExpression: 'SET content = :content',
    ExpressionAttributeValues: {
      ':content': content,
    },
    ReturnValues: 'ALL_NEW',
  });

  const result = await client.send(command);
  return result.Attributes;
}

async function deletePost(id: string) {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id: id }
  });

  await client.send(command);
  return true;
} 