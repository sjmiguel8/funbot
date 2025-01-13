'use client'
import React from 'react';
import { Card, Stack, Button } from 'react-bootstrap';

const NotificationsView = () => {
  const notifications = [
    {
      id: 1,
      type: 'follow',
      user: 'Sarah Chen',
      time: '2h ago',
      read: false
    },
    {
      id: 2,
      type: 'like',
      user: 'Mike Rivera',
      content: 'your latest track',
      time: '3h ago',
      read: false
    },
    {
      id: 3,
      type: 'comment',
      user: 'Alex Thompson',
      content: 'Great beat! Would love to collab',
      time: '5h ago',
      read: true
    },
    {
      id: 4,
      type: 'mention',
      user: 'Lisa Wong',
      content: 'mentioned you in a post',
      time: '1d ago',
      read: true
    }
  ];

  return (
    <Stack gap={3} className="mx-auto" style={{ maxWidth: '700px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-light mb-0">Notifications</h1>
        <Button variant="link" className="text-muted">Mark all as read</Button>
      </div>

      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          bg="dark" 
          border="secondary" 
          className={`shadow-sm ${!notification.read ? 'border-primary' : ''}`}
        >
          <Card.Body className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle bg-secondary flex-shrink-0" 
              style={{ width: '40px', height: '40px' }}
            />
            <div className="flex-grow-1">
              <p className="mb-1 text-light">
                <strong>{notification.user}</strong>
                {' '}
                {notification.type === 'follow' && 'started following you'}
                {notification.type === 'like' && `liked ${notification.content}`}
                {notification.type === 'comment' && `commented: ${notification.content}`}
                {notification.type === 'mention' && notification.content}
              </p>
              <small className="text-muted">{notification.time}</small>
            </div>
            {!notification.read && (
              <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
            )}
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default NotificationsView; 