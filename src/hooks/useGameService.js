import { distributeCards, getPlayerHand, submitCard, judgeRound } from '../apis/race';
import { PLAYER_ID } from '../constants/player';

export function useGameService() {
  const dealCards = async (raceId, isFirstRound) => {
    if (isFirstRound) {
      await distributeCards(raceId);
    }
    const data = await getPlayerHand(raceId);
    return data.cards;
  };

  const playRound = async (raceId, round, cardNumber) => {
    await submitCard(raceId, round, {
      playerId: PLAYER_ID,
      cardNumber,
    });

    const result = await judgeRound(raceId, round);
    return result;
  };

  return {
    dealCards,
    playRound,
  };
}
