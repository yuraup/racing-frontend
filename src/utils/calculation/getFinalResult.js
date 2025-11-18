import { RESULT_TEXT } from '../../constants/result';
import { PLAYER_CAR_INDEX } from '../../constants/player';

export const getFinalResult = carProgress => {
  const playerScore = carProgress[PLAYER_CAR_INDEX];
  const others = carProgress.filter((_, i) => i !== PLAYER_CAR_INDEX);
  const maxOtherScore = Math.max(...others);

  if (playerScore > maxOtherScore) return RESULT_TEXT.WIN;
  if (playerScore < maxOtherScore) return RESULT_TEXT.LOSE;
  return RESULT_TEXT.DRAW;
};
