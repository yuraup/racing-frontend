import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { RESULT_TEXT } from '../../constants/result';
import { getRaceStatus } from '../../apis/race';

function FinalModal({ raceId, myName }) {
  const navigate = useNavigate();
  const [finalIsPlayerWin, setFinalIsPlayerWin] = useState(null);

  useEffect(() => {
    const fetchFinalResult = async () => {
      try {
        const status = await getRaceStatus(raceId);
        const ranking = status.ranking || [];

        if (!ranking.length) {
          setFinalIsPlayerWin(RESULT_TEXT.LOSE);
          return;
        }

        const me = ranking.find(p => p.name === myName);
        if (!me) {
          setFinalIsPlayerWin(RESULT_TEXT.LOSE);
          return;
        }

        const maxScore = Math.max(...ranking.map(p => p.score));
        const topPlayers = ranking.filter(p => p.score === maxScore);

        if (me.score < maxScore) {
          setFinalIsPlayerWin(RESULT_TEXT.LOSE);
          return;
        }

        if (topPlayers.length > 1) {
          setFinalIsPlayerWin(RESULT_TEXT.DRAW);
        } else {
          setFinalIsPlayerWin(RESULT_TEXT.WIN);
        }
      } catch (error) {
        console.error('최종 결과 조회 실패:', error);
        setFinalIsPlayerWin(RESULT_TEXT.LOSE);
      }
    };

    if (raceId && myName) {
      fetchFinalResult();
    }
  }, [raceId, myName]);

  const handleRetry = () => {
    navigate('/');
  };

  if (!finalIsPlayerWin) {
    return (
      <Modal transparent>
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <p className="font-basic text-lg font-medium text-white">최종 결과 계산 중...</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal transparent>
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <img
          className="z-20"
          src={
            finalIsPlayerWin === RESULT_TEXT.WIN
              ? '/assets/win.png'
              : finalIsPlayerWin === RESULT_TEXT.LOSE
                ? '/assets/lose.png'
                : '/assets/draw.png'
          }
          alt="final-result"
        />
        <button
          type="button"
          onClick={handleRetry}
          className="font-basic z-50 mt-6 text-lg font-medium text-white hover:cursor-pointer"
        >
          다시하기
        </button>
      </div>
    </Modal>
  );
}

export default FinalModal;
