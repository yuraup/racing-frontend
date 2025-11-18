import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import SetUpPage from './pages/SetUpPage';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<SetUpPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
}
