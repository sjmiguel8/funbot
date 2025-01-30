'use client'
import './PostFeed';
import './HomeView.module.css';
import '../styles/global.css';
import PostFeed from './PostFeed';
import '/src/styles/MainLayout.module.css'
import '/src/styles/HomeView.module.css'
import '/src/styles/global.css'


export default function HomeView() {
  return (
    <div className="bg-gray-200 text-gray-900 p-4">
      <PostFeed />
    </div>
  );
}

