'use client'
import { useState } from 'react';
import './MessagesView.css';
import { Card, Form, Button, Stack } from 'react-bootstrap';

const MessagesView = () => {
  const [selectedChat, setSelectedChat] = useState<{ id: number; user: string; lastMessage: string; timestamp: string; unread: number } | null>(null);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      user: 'Sarah Chen',
      lastMessage: 'Hey, loved your latest track!',
      timestamp: '2m ago',
      unread: 2
    },
    // Add more chats...
  ];

  return (
    <div className="d-flex h-100 messages-view">
      <div className="d-flex h-100 messages-view-container">
        <div className="border-end border-secondary chat-list">
          <div className="border-end border-secondary" style={{ width: '320px' }}>
            <div className="p-3">
              <Form.Control
                type="search"
                placeholder="Search messages..."
                className="mb-3 bg-dark text-light border-secondary"
              />
              <Stack gap={2}>
                {chats.map(chat => (
                  <Card 
                    key={chat.id}
                    bg="dark"
                    border="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedChat(chat)}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <strong className="text-light">{chat.user}</strong>
                        <small className="text-muted">{chat.timestamp}</small>
                      </div>
                      <p className="text-muted mb-0">{chat.lastMessage}</p>
                    </Card.Body>
                  </Card>
                ))}
              </Stack>
            </div>
          </div>

          {/* Chat Window */}
          {selectedChat ? (
            <div className="flex-grow-1 d-flex flex-column">
              {/* Chat Header */}
              <div className="border-bottom border-secondary p-3">
                <h5 className="text-light mb-0">{selectedChat.user}</h5>
              </div>

              <div className="flex-grow-1 p-3 messages-area">
                <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
                  {/* Messages go here */}
                </div>

                {/* Message Input */}
                <div className="border-top border-secondary p-3">
                  <Form className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-dark text-light border-secondary"
                    />
                    <Button variant="primary">Send</Button>
                  </Form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
              <p className="text-muted">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesView; 