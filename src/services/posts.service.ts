import { GraphQLQuery } from '@aws-amplify/api';
import { generateClient } from 'aws-amplify/api';
import { deletePost, createPost, getPosts, updatePost } from '../graphql/mutations';


interface GetPostsResponse {
  getPosts: Post[];
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: string;
  likes: number;
  comments: number;
  attachments?: Attachment[];
}


interface Attachment {
  type: string;
  url: string;
}

const client = generateClient();


// other methods




export class PostsService {
  static async deletePost(postId: string): Promise<void> {
    try {
      await client.graphql({
        query: deletePost,
        variables: { id: postId }
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }

  static async updatePost(postId: string, content: string): Promise<void> {
    try {
      const updatedPost: Partial<Post> = { content };
      await client.graphql({
        query: updatePost,
        variables: { id: postId, input: updatedPost }
      });
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }

  static async getPosts(): Promise<Post[]> {
    try {
      const response = await client.graphql<GraphQLQuery<GetPostsResponse>>({
        query: getPosts,
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

  static async createPost(content: string, userId: string, username: string): Promise<void> {
    try {
      const newPost: Post = {
        id: 'create', // Assign a unique id here
        content,
        authorId: userId,
        authorName: username,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };

      await client.graphql({
        query: createPost,
        variables: { input: newPost }
      });
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }
}
