import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import GameCanvas from '../components/game/GameCanvas';
import RandomModal from '../components/modals/RandomModal';
import SelectModal from '../components/modals/SelectModal';
import ResultModal from '../components/modals/ResultModal';
import FinalModal from '../components/modals/FinalModal';
import GameHeader from '../components/game/GameHeader';

import { useGameFlow } from '../hooks/useGameFlow';
import { MODAL_STEP } from '../constants/modalStep';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  useEffect(() => {
    if (!config) {
      navigate('/setup');
    }
  }, [config, navigate]);

  const {
    modalStep,
    currentRound,
    totalRounds,
    cards,
    usedCards,
    selectedCard,
    roundBots,
    roundResult,
    myWins,
    carNames,
    animatedProgress,
    finalResult,
    handleRandomClick,
    handleSelectCard,
    handleConfirmResult,
  } = useGameFlow(config || {});

  if (!config) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <GameHeader myWins={myWins} />

      <AnimatePresence>
        {modalStep === MODAL_STEP.RANDOM && <RandomModal key="random" onNext={handleRandomClick} />}

        {modalStep === MODAL_STEP.SELECT && (
          <SelectModal
            key="select"
            round={currentRound}
            cards={cards}
            usedCards={usedCards}
            onSelectCard={handleSelectCard}
          />
        )}

        {modalStep === MODAL_STEP.RESULT && (
          <ResultModal
            key="result"
            myName={config.carName}
            round={currentRound}
            selectedCard={selectedCard}
            bots={roundBots}
            result={roundResult}
            onConfirm={handleConfirmResult}
          />
        )}

        {modalStep === MODAL_STEP.FINAL && <FinalModal key="final" result={finalResult} />}
      </AnimatePresence>

      <GameCanvas carProgress={animatedProgress} carNames={carNames} totalRounds={totalRounds} />
    </div>
  );
}
