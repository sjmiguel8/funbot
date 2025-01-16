'use client'
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import './page.css';

const ExploreView = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const categories = ['All', 'Rock', 'Jazz', 'Electronic', 'Classical', 'Hip Hop'];
  
  return (
    <Stack gap={4} className="mx-auto" style={{ maxWidth: '700px' }}>
      <h1 className="text-light">Explore</h1>

      {/* Search and Filter */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body>
          <Form.Control
            type="search"
            placeholder="Search artists, songs, or genres..."
            className="mb-3 bg-dark text-light border-secondary"
          />
          <div className="d-flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={selectedGenre === category ? 'primary' : 'outline-secondary'}
                onClick={() => setSelectedGenre(category)}
                className="rounded-pill"
              >
                {category}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Trending Artists */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body>
          <h5 className="text-light mb-4">Trending Artists</h5>
          <Row className="g-3">
            {[1, 2, 3].map((i) => (
              <Col key={i} md={4}>
                <div className="text-center">
                  <div 
                    className="rounded-circle bg-secondary mx-auto mb-2" 
                  />
                  <h6 className="text-light mb-0">Artist Name {i}</h6>
                  <small className="text-muted">1.2M followers</small>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Trending Tracks */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body>
          <h5 className="text-light mb-4">Trending Tracks</h5>
          {[1, 2, 3].map((i) => (
            <div key={i} className="d-flex align-items-center mb-3 p-2 hover-overlay rounded">
              <div className="bg-secondary rounded track-image" />
              <div className="ms-3 flex-grow-1">
                <h6 className="text-light mb-0">Track Name {i}</h6>
                <small className="text-muted">Artist {i}</small>
              </div>
              <div className="text-muted">
                <small>3:45</small>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* Featured Playlists */}
      <Card bg="dark" border="secondary" className="shadow-sm">
        <Card.Body>
          <h5 className="text-light mb-4">Featured Playlists</h5>
          <Row className="g-3">
            {[1, 2, 3].map((i) => (
              <Col key={i} md={4}>
                <Card bg="dark" border="secondary">
                  <Card.Body>
                    <div 
                      className="bg-secondary rounded mb-2 playlist-image" 
                    />
                    <h6 className="text-light mb-1">Playlist {i}</h6>
                    <small className="text-muted">32 tracks</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default ExploreView; 