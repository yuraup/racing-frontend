import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { RESULT_TEXT } from '../../constants/result';

function FinalModal({ result }) {
  const navigate = useNavigate();

  if (!result) {
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

  const imageSrc =
    result === 'WIN'
      ? '/assets/win.png'
      : result === 'LOSE'
        ? '/assets/lose.png'
        : '/assets/draw.png';

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <Modal transparent>
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <img className="z-20" src={imageSrc} alt="final-result" />
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
