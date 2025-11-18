import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { RESULT_TEXT } from '../../constants/result';

function FinalModal({ finalIsPlayerWin }) {
  const navigate = useNavigate();
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
        />
        <button
          type="button"
          onClick={() => navigate('/')}
          className="font-basic z-50 mt-6 text-lg font-medium text-white hover:cursor-pointer"
        >
          다시하기
        </button>
      </div>
    </Modal>
  );
}

export default FinalModal;
