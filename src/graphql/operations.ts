export const createPost = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      content
      authorId
      authorName
      timestamp
      likes
      comments
      attachments {
        type
        url
      }
    }
  }
`;

export const getPosts = /* GraphQL */ `
  query GetPosts {
    getPosts {
      id
      content
      authorId
      authorName
      timestamp
    }
  }
`;

export const updatePost = /* GraphQL */ `
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      content
      authorId
      authorName
      timestamp
      likes
      comments
      attachments {
        type
        url
      }
    }
  }
`;

export const deletePost = /* GraphQL */ `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;