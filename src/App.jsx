import { Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import SetUpPage from './pages/SetUpPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setup" element={<SetUpPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
