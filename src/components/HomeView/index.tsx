'use client'
import { signOut } from 'aws-amplify/auth'
import { useState } from 'react'
import ChatView from './ChatView'
import ExploreView from '../../app/explore/page'
import ProfileView from '../../app/profile/page'

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
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Wavelength</h1>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setSelectedTab('chat')}
            className={`w-full text-left px-4 py-2 ${
              selectedTab === 'chat' ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setSelectedTab('explore')}
            className={`w-full text-left px-4 py-2 ${
              selectedTab === 'explore' ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setSelectedTab('profile')}
            className={`w-full text-left px-4 py-2 ${
              selectedTab === 'profile' ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
          >
            Profile
          </button>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
          >
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {selectedTab === 'chat' && <ChatView />}
        {selectedTab === 'explore' && <ExploreView />}
        {selectedTab === 'profile' && <ProfileView />}
      </div>
    </div>
  )
} 