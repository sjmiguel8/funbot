import { GraphQLQuery } from '@aws-amplify/api';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries'; // Ensure this path is correct and the file exists
import { GetPostsQuery } from '../graphql/API';

const client = generateClient();

export class PostsService {
  async getPosts() {
    try {
      const response = await client.graphql<GraphQLQuery<GetPostsQuery>>({
        query: queries.getPosts,
      });

      if (response.errors) {
        console.error('GraphQL Errors:', response.errors);
        throw new Error('Failed to fetch posts');
      }

      return response.data?.getPosts || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }
} 