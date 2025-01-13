'use client'
import { useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Stack gap={4} className="mx-auto" style={{ maxWidth: '700px' }}>
      {/* Profile Header */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-gray-800"></div>
          </div>
        </div>
        
        <div className="mt-20 px-6 pb-6">
          <div className="d-flex justify-between align-items-start">
            <div>
              <h1 className="text-2xl font-bold text-light">Alex Thompson</h1>
              <p className="text-muted">@alexmusic</p>
            </div>
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? 'danger' : 'primary'}
              className="px-4"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
          
          <p className="text-muted mt-4">
            Music producer 🎵 | Guitar enthusiast 🎸 | Creating vibes since 2018
          </p>
          
          <div className="d-flex space-x-6 mt-4 text-muted">
            <span><strong>1.2k</strong> Following</span>
            <span><strong>4.5k</strong> Followers</span>
            <span><strong>238</strong> Posts</span>
          </div>
        </div>
      </Card>

      {/* Content Tabs */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <div className="d-flex border-bottom border-secondary mb-4">
          {['Posts', 'Media', 'Likes'].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              variant={activeTab === tab.toLowerCase() ? 'primary' : 'link'}
              className="flex-grow-1 text-light"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        <div className="p-4">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {/* Sample posts */}
              <div className="border-b border-gray-700 pb-4">
                <p className="text-gray-300">Working on some new beats! Can't wait to share them with you all! 🎵</p>
                <div className="d-flex align-items-center mt-2 text-muted text-sm">
                  <span>2h ago</span>
                  <span className="mx-2">•</span>
                  <span>42 likes</span>
                  <span className="mx-2">•</span>
                  <span>12 comments</span>
                </div>
              </div>
              {/* Add more posts */}
            </div>
          )}
        </div>
      </Card>
    </Stack>
  );
};

export default ProfileView; 