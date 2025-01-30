'use client'
import { useState } from 'react';
import { Post, PostsService } from '../services/posts.service';
import '/src/styles/MainLayout.module.css'
import '/src/styles/HomeView.module.css'
import '/src/styles/global.css'


interface PostCardProps {
  post: Post;
  onPostUpdated: () => void;
}

export default function PostCard({ post, onPostUpdated }: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    try {
      await PostsService.deletePost(post.id);
      onPostUpdated();
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      await PostsService.updatePost(post.id, content);
      setIsEditing(false);
      onPostUpdated();
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{post.authorName}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Edit your post content"
            title="Post Content"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2">{post.content}</p>
      )}

      <div className="mt-2 flex gap-4 text-gray-500">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>
    </div>
  );
} 