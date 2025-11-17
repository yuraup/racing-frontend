import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generateRandomCards from '../utils/generateRandomCards';
import GameCanvas from '../components/game/GameCanvas';
import RandomModal from '../components/modals/RandomModal';
import SelectModal from '../components/modals/SelectModal';
import ResultModal from '../components/modals/ResultModal';
import { MODAL_STEP } from '../constants/modalStep';
import GameHeader from '../components/game/GameHeader';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  const [modalStep, setModalStep] = useState(MODAL_STEP.RANDOM);
  const [cards] = useState(() => (config ? generateRandomCards(config.roundNumber) : []));
  const [selectedCard, setSelectedCard] = useState(null);
  const [roundResult, setRoundResult] = useState(null);

  const [myWins, setMyWins] = useState(0);

  useEffect(() => {
    if (!config) {
      navigate('/setup');
    }
  }, [config, navigate]);

  const handleGoSelect = () => {
    setModalStep(MODAL_STEP.SELECT);
  };

  const handleSelectCard = card => {
    setSelectedCard(card);
    const result = Math.random() > 0.5 ? 'WIN' : 'LOSE';
    setRoundResult(result);
    setModalStep(MODAL_STEP.RESULT);
  };

  const hanldeConfirmResult = () => {
    setModalStep(MODAL_STEP.HIDDEN);

    if (roundResult === 'WIN') {
      setMyWins(prev => prev + 1);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <GameHeader myWins={myWins} />
      {modalStep === MODAL_STEP.RANDOM && <RandomModal onNext={handleGoSelect} />}
      {modalStep === MODAL_STEP.SELECT && (
        <SelectModal cards={cards} onSelectCard={handleSelectCard} />
      )}
      {modalStep === MODAL_STEP.RESULT && (
        <ResultModal
          round={1}
          selectedCard={selectedCard}
          result={roundResult}
          onConfirm={hanldeConfirmResult}
        />
      )}
      <GameCanvas />
    </div>
  );
}
