import { RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER } from '../../constants/RuleNumbers';

export default function generateRandomCards(
  count,
  min = RANDOM_MIN_NUMBER,
  max = RANDOM_MAX_NUMBER
) {
  const numbers = new Set();

  while (numbers.size < count) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(number);
  }

  return Array.from(numbers);
}
