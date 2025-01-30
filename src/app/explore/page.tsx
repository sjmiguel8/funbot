'use client'
import React, { useState } from 'react';
import styles from '../../../styles/pages/explore.module.css';

const ExploreView = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const categories = ['All', 'Rock', 'Jazz', 'Electronic', 'Classical', 'Hip Hop'];
  
  return (
    <div className={styles.exploreContainer}>
      <h1>Explore</h1>

      {/* Search and Filter */}
      <div className={styles.searchSection}>
        <input
          type="search"
          placeholder="Search artists, songs, or genres..."
          className={styles.searchBar}
        />
        <div className={styles.filters}>
          {categories.map((category) => (
            <button 
              key={category} 
              className={`${styles.filterButton} ${selectedGenre === category ? styles.active : ''}`}
              onClick={() => setSelectedGenre(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Artists */}
      <section className={styles.section}>
        <h2>Trending Artists</h2>
        <div className={styles.artistsGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.artistCard}>
              <div className={styles.artistAvatar} />
              <h3>Artist Name {i}</h3>
              <span className={styles.followers}>1.2M followers</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section className={styles.section}>
        <h2>Trending Tracks</h2>
        <div className={styles.tracksList}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.trackItem}>
              <div className={styles.trackImage} />
              <div className={styles.trackInfo}>
                <h3>Track Name {i}</h3>
                <span className={styles.artistName}>Artist {i}</span>
              </div>
              <span className={styles.duration}>3:45</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className={styles.section}>
        <h2>Featured Playlists</h2>
        <div className={styles.playlistsGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.playlistCard}>
              <div className={styles.playlistImage} />
              <h3>Playlist {i}</h3>
              <span className={styles.trackCount}>32 tracks</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreView;
