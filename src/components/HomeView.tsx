'use client'
import React, { useState } from 'react';
import { Card, Form, Button, Stack } from 'react-bootstrap';

const HomeView = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'Sarah Chen', handle: '@sarahc', avatar: '👩🏻‍🎤' },
      content: 'Just dropped my new track! Check it out on my profile 🎵',
      timestamp: '2h ago',
      likes: 42,
      comments: 12,
      isLiked: false
    },
    {
      id: 2,
      author: { name: 'Mike Rivera', handle: '@mikebeats', avatar: '👨🏽‍🎤' },
      content: 'Looking for vocalists to collaborate on my new EDM project! DM if interested 🎧',
      timestamp: '4h ago',
      likes: 28,
      comments: 8,
      isLiked: true
    },
  ]);

  return (
    <Stack gap={4} className="mx-auto" style={{ maxWidth: '700px' }}>
      {/* Create Post */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What's on your mind?"
                className="bg-dark text-light border-secondary"
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
                <span>📎</span> Attach
              </Button>
              <Button variant="primary" className="px-4">Post</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Posts Feed */}
      {posts.map(post => (
        <Card key={post.id} bg="dark" border="secondary" className="shadow-sm">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center flex-grow-1">
                <span className="fs-4 me-3">{post.author.avatar}</span>
                <div>
                  <h6 className="mb-0 text-light">{post.author.name}</h6>
                  <small className="text-muted">{post.author.handle}</small>
                </div>
              </div>
              <small className="text-muted ms-3">{post.timestamp}</small>
            </div>
            <Card.Text className="text-light mb-4">
              {post.content}
            </Card.Text>
            <div className="d-flex gap-4">
              <Button
                variant="link"
                className={`p-0 text-decoration-none ${post.isLiked ? 'text-danger' : 'text-secondary'}`}
                onClick={() => {
                  setPosts(posts.map(p => 
                    p.id === post.id 
                      ? { ...p, isLiked: !p.isLiked, likes: p.likes + (p.isLiked ? -1 : 1) }
                      : p
                  ))
                }}
              >
                <span className="d-flex align-items-center gap-2">❤️ {post.likes}</span>
              </Button>
              <Button variant="link" className="p-0 text-secondary text-decoration-none">
                <span className="d-flex align-items-center gap-2">💬 {post.comments}</span>
              </Button>
              <Button variant="link" className="p-0 text-secondary text-decoration-none">
                <span className="d-flex align-items-center gap-2">↗️ Share</span>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default HomeView;