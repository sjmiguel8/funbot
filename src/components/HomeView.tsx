'use client'
import styled from 'styled-components';
import PostFeed from './PostFeed';
import styles from './HomeView.module.css';

const Container = styled.div`
  background-color: #e0e0e0; /* Change to your desired color */
  color: #222; /* Change text color */
  padding: 20px;
`;

export default function HomeView() {
  return (
    <div className={styles.container}>
      <PostFeed />
    </div>
  );
}