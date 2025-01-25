'use client'
import React, { useState, useRef, useEffect } from 'react';
import NavigationList from '../NavigationList';
import Link from 'next/link';
import { Form, Button, Card } from 'react-bootstrap';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [showTrending, setShowTrending] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Refs for dropdown containers
  const notificationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setShowChat(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample notifications data
  const notifications = [
    { id: 1, text: 'Sarah Chen liked your track', time: '2m ago' },
    { id: 2, text: 'New follower: Mike Rivera', time: '1h ago' },
    { id: 3, text: 'DJ Pulse commented on your post', time: '3h ago' },
  ];

  // Sample chat data
  const recentChats = [
    { id: 1, name: 'Sarah Chen', message: 'Hey, loved your latest track!', time: '2m ago' },
    { id: 2, name: 'Mike Rivera', message: 'Thanks for the feedback!', time: '1h ago' },
    { id: 3, name: 'DJ Pulse', message: 'The mix is ready', time: '3h ago' },
  ];

  // Sample search results
  const searchResults = [
    { id: 1, type: 'user', name: 'Sarah Chen', handle: '@sarahc' },
    { id: 2, type: 'track', name: 'Summer Vibes', artist: 'DJ Pulse' },
    { id: 3, type: 'playlist', name: 'Chill Mix 2024', by: 'Mike Rivera' },
  ];

  return (
    <div className={styles.layout}>
      {/* Left Sidebar - Fixed */}
      <div className="position-fixed start-0 top-0 h-100 bg-dark border-end border-secondary sidebar" 
           style={{ zIndex: 1030 }}>
        <div className="p-3">
          <Link href="/" className="d-flex align-items-center text-decoration-none mb-4">
            <div className="rounded-circle bg-primary p-2 me-2"></div>
            <span className="h4 text-light mb-0">Wavelength</span>
          </Link>
          <NavigationList />
          <Link href="/profile" className="nav-link">
            Profile
          </Link>
        </div>
      </div>

      {/* Main Content - With left margin to account for sidebar */}
      <div style={{ marginLeft: '240px' }}>
        {/* Header - Fixed */}
        <div className="position-fixed top-0 bg-dark border-bottom border-secondary" 
             style={{ left: '240px', right: '0', zIndex: 1020, padding: '10px 20px' }}>
          <div className="d-flex justify-content-between align-items-center" style={{ height: '60px' }}>
            {/* Search Bar with Dropdown */}
            <div ref={searchRef} className="position-relative w-50">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="bg-dark text-light border-secondary"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
              />
              {showSearchResults && searchQuery && (
                <Card className="position-absolute w-100 mt-1 bg-dark border-secondary">
                  <Card.Body>
                    {searchResults.map(result => (
                      <div key={result.id} className="p-2 hover:bg-secondary rounded cursor-pointer">
                        <div className="text-light">{result.name}</div>
                        <small className="text-muted">
                          {result.type === 'user' && result.handle}
                          {result.type === 'track' && `Track by ${result.artist}`}
                          {result.type === 'playlist' && `Playlist by ${result.by}`}
                        </small>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              )}
            </div>

            <div className="d-flex align-items-center gap-3">
              {/* Notifications Dropdown */}
              <div ref={notificationRef} className="position-relative">
                <Button 
                  variant="dark" 
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </Button>
                {showNotifications && (
                  <Card className="position-absolute end-0 mt-1 bg-dark border-secondary" style={{ width: '300px' }}>
                    <Card.Header className="border-bottom border-secondary">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 text-light">Notifications</h6>
                        <Link href="/notifications" className="text-primary text-decoration-none">
                          See all
                        </Link>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-2 hover:bg-secondary rounded cursor-pointer">
                          <div className="text-light">{notification.text}</div>
                          <small className="text-muted">{notification.time}</small>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                )}
              </div>

              {/* Chat Dropdown */}
              <div ref={chatRef} className="position-relative">
                <Button 
                  variant="dark" 
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => setShowChat(!showChat)}
                >
                  <span className="material-symbols-outlined">
                    chat
                  </span>
                </Button>
                {showChat && (
                  <Card className="position-absolute end-0 mt-1 bg-dark border-secondary" style={{ width: '300px' }}>
                    <Card.Header className="border-bottom border-secondary">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 text-light">Messages</h6>
                        <Link href="/messages" className="text-primary text-decoration-none">
                          See all
                        </Link>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      {recentChats.map(chat => (
                        <div key={chat.id} className="p-2 hover:bg-secondary rounded cursor-pointer">
                          <div className="text-light">{chat.name}</div>
                          <small className="text-muted">{chat.message}</small>
                          <div className="text-muted"><small>{chat.time}</small></div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                )}
              </div>

              <Button variant="dark" onClick={() => setShowTrending(!showTrending)}>
                <span className="material-symbols-outlined">
                  trending_up
                </span>
              </Button>

              {/* Profile Link */}
              <Link 
                href="/profile" 
                className="rounded-circle bg-secondary cursor-pointer hover:opacity-80 transition-opacity"
                style={{ 
                  width: 40, 
                  height: 40,
                  display: 'block',
                  cursor: 'pointer'
                }}
                aria-label="Go to profile"
              />
            </div>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="pt-5 mt-4">
          <div className="d-flex justify-content-center">
            <div style={{ 
              width: '100%', 
              maxWidth: '600px', 
              marginRight: showTrending ? '320px' : '0',
              transition: 'margin-right 0.3s ease-in-out'
            }}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Fixed */}
      {showTrending && (
        <div className="position-fixed end-0 top-0 h-100 bg-dark border-start border-secondary overflow-auto right-sidebar">
          <div className="p-3">
            <h5 className="text-light mb-4">Trending</h5>
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-dark border-secondary mb-3">
                <div className="card-body p-3">
                  <small className="text-muted d-block">Trending in Music</small>
                  <p className="mb-1 text-light">#TrendingTopic{i}</p>
                  <small className="text-muted">10.{i}k posts</small>
                </div>
              </div>
            ))}

            <h5 className="text-light mb-4 mt-5">Suggested Artists</h5>
            {[1, 2, 3].map((i) => (
              <div key={i} className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-secondary me-3" style={{ width: 48, height: 48 }}></div>
                  <div>
                    <p className="mb-0 text-light">Artist Name {i}</p>
                    <small className="text-muted">@artist{i}</small>
                  </div>
                </div>
                <Button variant="outline-primary" size="sm" className="rounded-pill px-3">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
