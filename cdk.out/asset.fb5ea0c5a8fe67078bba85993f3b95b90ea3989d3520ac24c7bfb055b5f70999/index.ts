import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.POSTS_TABLE!;

export const handler = async (event: any) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  switch (event.fieldName) {
    case 'getPosts':
      return await getPosts();
    case 'createPost':
      return await createPost(event.arguments.input);
    case 'updatePost':
      return await updatePost(event.arguments.id, event.arguments.input);
    case 'deletePost':
      return await deletePost(event.arguments.id);
    default:
      throw new Error(`Unknown field: ${event.fieldName}`);
  }
};

async function getPosts() {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });
  const result = await docClient.send(command);
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
  
  await docClient.send(command);
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

  const result = await docClient.send(command);
  return result.Attributes;
}

async function deletePost(id: string) {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id: id }
  });

  await docClient.send(command);
  return true;
} 