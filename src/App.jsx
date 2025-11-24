import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import SetUpPage from './pages/SetUpPage';
import GamePage from './pages/GamePage';
import BgmPlayer from './components/music/bgmPlayer';

export default function App() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <BgmPlayer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setup" element={<SetUpPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
