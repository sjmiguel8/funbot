'use client'
import { useEffect, useState } from 'react';
import { Post, PostsService } from '../services/posts.service';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import '/src/styles/MainLayout.module.css'
import '/src/styles/HomeView.module.css'
import '/src/styles/global.css'


export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);



  async function loadPosts() {
    try {
      const fetchedPosts = await PostsService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <CreatePost onPostCreated={loadPosts} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onPostUpdated={loadPosts} />
      ))}
    </div>
  );
} 