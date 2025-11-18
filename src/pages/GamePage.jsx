import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generateRandomCards from '../utils/generateRandomCards';
import GameCanvas from '../components/game/GameCanvas';
import RandomModal from '../components/modals/RandomModal';
import SelectModal from '../components/modals/SelectModal';
import ResultModal from '../components/modals/ResultModal';
import FinalModal from '../components/modals/finalModal';
import GameHeader from '../components/game/GameHeader';

import { moveAnimation } from '../utils/game/moveAnimation';
import { getFinalResult } from '../utils/calculation/getFinalResult';

import { MODAL_STEP } from '../constants/modalStep';
import { PLAYER_CAR_INDEX } from '../constants/player';
import { CARS } from '../constants/canvas/canvasCars';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  const totalrounds = config?.roundNumber;
  const [currentRound, setCurrentRound] = useState(1);
  const [modalStep, setModalStep] = useState(MODAL_STEP.RANDOM);

  const [cards] = useState(() => (config ? generateRandomCards(config.roundNumber) : []));
  const [usedCards, setUsedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [roundResult, setRoundResult] = useState(null);

  const totalCars = config?.carNumber + 1;
  const [carProgress, setCarProgress] = useState(() => Array(totalCars).fill(0));
  const [animatedProgress, setAnimatedProgress] = useState(() => Array(totalCars).fill(0));
  const [winnerCarIndex, setWinnerCarIndex] = useState(null);
  const [myWins, setMyWins] = useState(0);

  const [finalIsPlayerWin, setFinalIsPlayerWin] = useState(null);

  useEffect(() => {
    if (!config) {
      navigate('/setup');
    }
  }, [config, navigate]);

  const carNames = useMemo(() => {
    const names = [...CARS.NAMES];
    names[PLAYER_CAR_INDEX] = config.carName;
    return names;
  }, [config.carName]);

  const handleGoSelect = () => {
    setModalStep(MODAL_STEP.SELECT);
  };

  const handleSelectCard = card => {
    setSelectedCard(card);
    setUsedCards(prev => [...prev, card]);

    const winnerIndex = Math.floor(Math.random() * totalCars);
    const isPlayerWin = winnerIndex === PLAYER_CAR_INDEX;
    setWinnerCarIndex(winnerIndex);
    setRoundResult(isPlayerWin ? 'WIN' : 'LOSE');

    setModalStep(MODAL_STEP.RESULT);
  };

  const hanldeConfirmResult = () => {
    setModalStep(MODAL_STEP.HIDDEN);

    if (winnerCarIndex !== null) {
      setCarProgress(prev => {
        const updated = prev.map((step, index) => (index === winnerCarIndex ? step + 1 : step));

        if (currentRound === totalrounds) {
          setTimeout(() => {
            const finalResult = getFinalResult(updated);
            setFinalIsPlayerWin(finalResult);
            setModalStep(MODAL_STEP.FINAL);
          }, 2000);
        }

        return updated;
      });
    } else if (currentRound === totalrounds) {
      setTimeout(() => {
        const finalResult = getFinalResult(carProgress);
        setFinalIsPlayerWin(finalResult);
        setModalStep(MODAL_STEP.FINAL);
      }, 2000);
    }

    moveAnimation({
      winnerCarIndex,
      animatedProgress,
      setAnimatedProgress,
    });

    if (roundResult === 'WIN') {
      setMyWins(prev => prev + 1);
    }

    if (currentRound === totalrounds) {
      return;
    }

    setCurrentRound(prev => prev + 1);
    setSelectedCard(null);
    setRoundResult(null);
    setWinnerCarIndex(null);

    setTimeout(() => {
      setModalStep(MODAL_STEP.SELECT);
    }, 2000);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <GameHeader myWins={myWins} />
      {modalStep === MODAL_STEP.RANDOM && <RandomModal onNext={handleGoSelect} />}
      {modalStep === MODAL_STEP.SELECT && (
        <SelectModal
          round={currentRound}
          cards={cards}
          usedCards={usedCards}
          onSelectCard={handleSelectCard}
        />
      )}
      {modalStep === MODAL_STEP.RESULT && (
        <ResultModal
          myName={config.carName}
          round={currentRound}
          selectedCard={selectedCard}
          result={roundResult}
          onConfirm={hanldeConfirmResult}
        />
      )}
      {modalStep === MODAL_STEP.FINAL && <FinalModal finalIsPlayerWin={finalIsPlayerWin} />}
      <GameCanvas carProgress={animatedProgress} carNames={carNames} totalRounds={totalrounds} />
    </div>
  );
}
