import Modal from './Modal';

function RandomModal({ onNext }) {
  return (
    <Modal>
      <div
        className="bg-light/90 relative z-10 flex h-72 w-72 flex-col items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <p className="font-basic text-ink font-bold">랜덤 숫자를 뽑습니다.</p>
        <img
          src="/assets/random-card.png"
          alt="랜덤카드"
          onClick={onNext}
          className="h-40 w-40 hover:cursor-pointer"
        />
      </div>
    </Modal>
  );
}

export default RandomModal;
