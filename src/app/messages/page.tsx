'use client'
import React from 'react';
import { Card, Stack } from 'react-bootstrap';

const MessagesView = () => {
  return (
    <Stack gap={3} className="mx-auto" style={{ maxWidth: '700px' }}>
      <h1 className="text-light">Messages</h1>
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body>
          <p className="text-muted">You have no new messages.</p>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default MessagesView; 