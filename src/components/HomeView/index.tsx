'use client'
import { signOut } from 'aws-amplify/auth'
import { useState } from 'react'
import ChatView from './ChatView'
import ExploreView from '../../app/explore/page'
import ProfileView from '../../app/profile/page'
import styles from '../../../styles/components/HomeView.module.css'

export default function HomeView() {
  const [selectedTab, setSelectedTab] = useState('chat')

  async function handleSignOut() {
    try {
      await signOut()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h1 className={styles.title}>Wavelength</h1>
        </div>
        <nav className={styles.nav}>
          <button
            onClick={() => setSelectedTab('chat')}
            className={selectedTab === 'chat' ? styles.navItemActive : styles.navItem}
          >
            Chat
          </button>
          <button
            onClick={() => setSelectedTab('explore')}
            className={selectedTab === 'explore' ? styles.navItemActive : styles.navItem}
          >
            Explore
          </button>
          <button
            onClick={() => setSelectedTab('profile')}
            className={selectedTab === 'profile' ? styles.navItemActive : styles.navItem}
          >
            Profile
          </button>
          <button
            onClick={handleSignOut}
            className={styles.signOutButton}
          >
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {selectedTab === 'chat' && <ChatView />}
        {selectedTab === 'explore' && <ExploreView />}
        {selectedTab === 'profile' && <ProfileView />}
      </div>
    </div>
  )
}
