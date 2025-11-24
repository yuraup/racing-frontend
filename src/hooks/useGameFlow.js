import { useMemo, useState } from 'react';
import { useGameService } from './useGameService';

import { MODAL_STEP } from '../constants/modalStep';
import { PLAYER_CAR_INDEX } from '../constants/player';
import { CARS } from '../constants/canvas/canvasCars';
import { ANIMATION_DELAY } from '../constants/canvas/animation';
import { moveAnimation } from '../utils/game/moveAnimation';
import { getFinalResult } from '../utils/calculation/getFinalResult';

export function useGameFlow(config) {
  const { dealCards, playRound } = useGameService();

  const totalRounds = config?.roundNumber ?? 1;
  const totalCars = (config?.carNumber ?? 0) + 1;
  const raceId = config?.raceId;
  const playerName = config?.carName;

  const [currentRound, setCurrentRound] = useState(1);
  const [modalStep, setModalStep] = useState(MODAL_STEP.RANDOM);

  const [cards, setCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [roundBots, setRoundBots] = useState([]);
  const [roundResult, setRoundResult] = useState(null);

  const [myWins, setMyWins] = useState(0);
  const [winnerCarIndex, setWinnerCarIndex] = useState(null);
  const [carProgress, setCarProgress] = useState(() => Array(totalCars).fill(0));
  const [animatedProgress, setAnimatedProgress] = useState(() => Array(totalCars).fill(0));

  const [finalResult, setFinalResult] = useState(null);

  const carNames = useMemo(() => {
    const baseNames = CARS.NAMES.slice(0, totalCars);

    if (playerName && PLAYER_CAR_INDEX < baseNames.length) {
      baseNames[PLAYER_CAR_INDEX] = playerName;
    }

    return baseNames;
  }, [playerName, totalCars]);

  // 랜덤 카드 뽑기
  const handleRandomClick = async () => {
    if (!raceId) return;

    try {
      const newCards = await dealCards(raceId, currentRound === 1);
      setCards(newCards);
      setModalStep(MODAL_STEP.SELECT);
    } catch (error) {
      console.error('카드 분배 실패:', error);
    }
  };

  // 카드 선택
  const handleSelectCard = async card => {
    if (!raceId) return;

    try {
      setSelectedCard(card);
      setUsedCards(prev => [...prev, card]);

      const result = await playRound(raceId, currentRound, card);
      const bots = result.bots || [];
      setRoundBots(bots);

      const botCards = bots.map(bot => bot.cardNumber);
      const maxBotCard = botCards.length ? Math.max(...botCards) : -1;
      const isPlayerWin = card >= maxBotCard;

      setRoundResult(isPlayerWin ? 'WIN' : 'LOSE');

      const maxCard = Math.max(card, maxBotCard);
      let winnerName = playerName;
      if (maxBotCard > card) {
        const winnerBot = bots.find(bot => bot.cardNumber === maxCard);
        winnerName = winnerBot?.name;
      }
      const winnerIdx = carNames.findIndex(name => name === winnerName);
      setWinnerCarIndex(winnerIdx >= 0 ? winnerIdx : null);

      if (isPlayerWin) {
        setMyWins(prev => prev + 1);
      }

      setModalStep(MODAL_STEP.RESULT);
    } catch (error) {
      console.error('라운드 처리 중 에러:', error);
    }
  };

  // 라운드 결과 확인
  const handleConfirmResult = () => {
    setModalStep(MODAL_STEP.HIDDEN);

    if (winnerCarIndex !== null) {
      setCarProgress(prev => {
        const updated = prev.map((step, index) => (index === winnerCarIndex ? step + 1 : step));

        if (currentRound === totalRounds) {
          setFinalResult(getFinalResult(updated));
        }

        return updated;
      });
    } else if (currentRound === totalRounds) {
      setFinalResult(getFinalResult(carProgress));
    }

    moveAnimation({
      winnerCarIndex,
      animatedProgress,
      setAnimatedProgress,
    });

    if (currentRound === totalRounds) {
      setTimeout(() => {
        setModalStep(MODAL_STEP.FINAL);
      }, ANIMATION_DELAY);
      return;
    }

    setCurrentRound(prev => prev + 1);
    setSelectedCard(null);
    setRoundResult(null);
    setWinnerCarIndex(null);

    setTimeout(() => {
      setModalStep(MODAL_STEP.SELECT);
    }, ANIMATION_DELAY);
  };

  return {
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
    carProgress,
    animatedProgress,
    finalResult,

    handleRandomClick,
    handleSelectCard,
    handleConfirmResult,
  };
}
