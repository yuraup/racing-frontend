import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import SetUpPage from './pages/SetUpPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<SetUpPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}
