import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { createPost, getPosts, updatePost, deletePost } from '../graphql/operations';
import { v4 as uuidv4 } from 'uuid';

const client = generateClient();

export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: string;
  likes: number;
  comments: number;
  attachments?: {
    type: 'IMAGE' | 'AUDIO' | 'VIDEO';
    url: string;
  }[];
}

class PostsService {
  private async ensureAuth() {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken;
      
      if (!token) {
        console.error('No token found in session. Please log in again.');
        throw new Error('Authentication required. Please log in.');
      }
      
      console.log('Auth token:', token.toString().substring(0, 20) + '...');
      
      return token;
    } catch (err) {
      console.error('Authentication error:', err);
      if (err instanceof Error) {
        throw new Error(`Authentication failed: ${err.message}. Please check your credentials.`);
      }
      throw new Error('Authentication required');
    }
  }

  async createPost(content: string, authorId: string, authorName: string): Promise<Post> {
    const token = await this.ensureAuth();
    
    try {
      const result = await client.graphql({
        query: createPost,
        variables: {
          input: {
            id: uuidv4(),
            content,
            authorId,
            authorName,
            timestamp: new Date().toISOString()
          }
        },
        authMode: 'userPool',
        authToken: token.toString()
      });
      if ('data' in result) {
        return result.data.createPost;
      } else {
        throw new Error('Unexpected result type');
      }
    } catch (err) {
      console.error('Failed to create post:', err);
      throw new Error('Failed to create post. Please try again later.');
    }
  }

  async getPosts(): Promise<Post[]> {
    const token = await this.ensureAuth();
    
    try {
      const result = await client.graphql({
        query: getPosts,
        authMode: 'userPool',
        authToken: token.toString()
      });

      console.log('Full GraphQL Result:', JSON.stringify(result, null, 2));

      if ('errors' in result && result.errors) {
        result.errors.forEach((error, index) => {
          console.error(`GraphQL Error ${index + 1}:`, {
            message: error.message,
            path: error.path,
            extensions: error.extensions,
            locations: error.locations
          });
        });
        
        throw new Error('GraphQL Error: ' + result.errors[0]?.message || 'An unknown error occurred.');
      }

      if ('data' in result && !result.data) {
        throw new Error('No data returned from getPosts query');
      }

      if ('data' in result) {
        return result.data.getPosts || [];
      } else {
        console.error('Unexpected result type received.');
        throw new Error('Unexpected result type.');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('GraphQL Error Details:', {
          message: err.message,
          stack: err.stack
        });
        throw new Error(`Failed to get posts: ${err.message}.`);
      }
      console.error('Unexpected error structure:', JSON.stringify(err, null, 2));
      throw new Error('Failed to get posts: Unexpected error structure.');
    }
  }

  async updatePost(id: string, content: string): Promise<Post> {
    const token = await this.ensureAuth();
    
    try {
      const result = await client.graphql({
        query: updatePost,
        variables: {
          id,
          input: { content }
        },
        authMode: 'userPool',
        authToken: token.toString()
      });
      if ('data' in result) {
        return result.data.updatePost;
      } else {
        console.error('Unexpected result type received.');
        throw new Error('Unexpected result type.');
      }
    } catch (err) {
      console.error('Failed to update post:', err);
      throw new Error('Failed to update post. Please try again later.');
    }
  }

  async deletePost(id: string): Promise<boolean> {
    const token = await this.ensureAuth();
    
    try {
      const result = await client.graphql({
        query: deletePost,
        variables: { id },
        authMode: 'userPool',
        authToken: token.toString()
      });
      if ('data' in result) {
        return result.data.deletePost;
      } else {
        console.error('Unexpected result type received.');
        throw new Error('Unexpected result type.');
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
      throw new Error('Failed to delete post. Please try again later.');
    }
  }

  async testAuthAndFetchPosts() {
    try {
      const token = await this.ensureAuth();
      console.log('Token:', token);

      const result = await client.graphql({
        query: getPosts,
        authMode: 'userPool',
        authToken: token.toString()
      });

      console.log('Fetch Posts Result:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error during test:', error);
    }
  }
}

export const postsService = new PostsService(); 