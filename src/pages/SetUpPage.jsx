import { motion as Motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../components/common/Button';
import { MIN_CAR, MAX_CAR, MIN_ROUND, MAX_ROUND, MAX_NAME_LENGTH } from '../constants/setUpNumbers';
import { useNavigate } from 'react-router-dom';
export default function SetUpPage() {
  const [carNumber, setCarNumber] = useState(1);
  const [roundNumber, setRoundNumber] = useState(1);
  const [carName, setCarName] = useState('');

  const navigate = useNavigate();

  const handleCarNumber = e => {
    const action = e.currentTarget.innerText;
    if (action === '-' && carNumber > MIN_CAR) {
      setCarNumber(carNumber - 1);
    }
    if (action === '+' && carNumber < MAX_CAR) {
      setCarNumber(carNumber + 1);
    }
  };

  const handleRoundNumber = e => {
    const action = e.currentTarget.innerText;
    if (action === '-' && roundNumber > MIN_ROUND) {
      setRoundNumber(roundNumber - 1);
    }
    if (action === '+' && roundNumber < MAX_ROUND) {
      setRoundNumber(roundNumber + 1);
    }
  };

  const hanldeSubmit = () => {
    navigate('/game');
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full justify-center"
    >
      <div className="flex h-full w-full justify-center">
        <form className="bg-ink flex h-full w-64 flex-col items-center gap-14 overflow-scroll py-12 text-center">
          <img src="/assets/heart.png" alt="heart" className="h-9 w-10" />
          <p className="font-basic text-4xl font-bold">게임 준비</p>
          <div>
            <p className="font-basic bg mb-6 text-xl font-medium">경쟁할 자동차 수</p>
            <span className="font-basic flex items-center justify-between">
              <button
                type="button"
                onClick={handleCarNumber}
                className="text-ink h-8 w-8 rounded-md bg-pink-300 disabled:opacity-30"
                disabled={carNumber === 1}
              >
                -
              </button>
              <p className="font-bold">{carNumber}</p>
              <button
                type="button"
                onClick={handleCarNumber}
                className="text-ink h-8 w-8 rounded-md bg-pink-300 disabled:opacity-30"
                disabled={carNumber === 2}
              >
                +
              </button>
            </span>
          </div>
          <div>
            <p className="font-basic mb-6 text-xl font-medium">진행할 라운드 수</p>
            <span className="font-basic flex items-center justify-between">
              <button
                type="button"
                onClick={handleRoundNumber}
                className="text-ink h-8 w-8 rounded-md bg-pink-300 disabled:opacity-30"
                disabled={roundNumber === 1}
              >
                -
              </button>
              <p className="font-bold">{roundNumber}</p>
              <button
                type="button"
                onClick={handleRoundNumber}
                className="text-ink h-8 w-8 rounded-md bg-pink-300 disabled:opacity-30"
                disabled={roundNumber === 5}
              >
                +
              </button>
            </span>
          </div>
          <div>
            <p className="font-basic mb-6 text-xl font-medium">내 자동차 이름</p>
            <input
              placeholder={`자동차 이름을 ${MAX_NAME_LENGTH} 자 이내로 입력해주세요`}
              value={carName}
              onChange={e => setCarName(e.target.value)}
              maxLength={MAX_NAME_LENGTH}
              className="font-basic h-12 w-60 rounded-md bg-white text-center text-xs font-medium text-pink-300"
            />
          </div>
          <Button type="submit" disabled={carName.trim().length === 0} onClick={hanldeSubmit}>
            시작하기
          </Button>
        </form>
      </div>
    </Motion.div>
  );
}
