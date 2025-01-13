import { Routes, Route } from 'react-router-dom';
import Home from './components/HomeView';
import Explore from './app/explore/page'; // Updated import path
import Notifications from './app/notifications/page'; // Updated import path
import Messages from './app/messages/page'; // Updated import path
import Bookmarks from './app/bookmarks/page'; // Updated import path
import Profile from './app/profile/page'; // Updated import path

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App; 