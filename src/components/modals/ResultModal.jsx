import Modal from './Modal';
import Button from '../../components/common/Button';
import { RESULT_TEXT } from '../../constants/result';

function ResultModal({ round, selectedCard, result, onConfirm }) {
  const resultLabel = RESULT_TEXT[result];
  return (
    <Modal>
      <div
        className="relative z-10 flex h-72 w-72 flex-col items-center justify-center gap-4"
        onClick={e => e.stopPropagation()}
      >
        <p className="font-basic text-pink text-stroke-white text-2xl font-bold">Round {round}</p>
        <div className="font-basic mr-10 flex flex-col gap-3 text-xs font-bold">
          <p className="text-deep">내 이름: {selectedCard}</p>
          <p className="text-ink">참치마요짱: 29</p>
          <p className="text-ink">삼김에는국물: 40</p>
        </div>
        <p className="font-basic text-neon text-stroke-navy text-3xl font-bold">{resultLabel}</p>
        <Button type="button" onClick={onConfirm} className="z-100 h-10 w-52">
          확인
        </Button>
      </div>
    </Modal>
  );
}

export default ResultModal;
