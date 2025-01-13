'use client'
import React from 'react';
import { Card, Stack } from 'react-bootstrap';

const ChatView = () => {
  return (
    <Stack gap={3} className="mx-auto" style={{ maxWidth: '700px' }}>
      <h1 className="text-light">Chat</h1>
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body>
          <p className="text-muted">You have no active chats.</p>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default ChatView; 