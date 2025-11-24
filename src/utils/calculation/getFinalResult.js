import { PLAYER_CAR_INDEX } from '../../constants/player';

export function getFinalResult(carProgress) {
  if (!Array.isArray(carProgress) || carProgress.length === 0) {
    return 'LOSE';
  }

  const maxScore = Math.max(...carProgress);
  const playerScore = carProgress[PLAYER_CAR_INDEX];

  if (playerScore < maxScore) {
    return 'LOSE';
  }

  const topCount = carProgress.filter(score => score === maxScore).length;
  if (topCount > 1) {
    return 'DRAW';
  }

  return 'WIN';
}
