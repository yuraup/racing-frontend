import Modal from './Modal';

function SelectModal({ round, cards, onSelectCard }) {
  return (
    <Modal>
      <div
        className="relative flex w-full flex-col items-center justify-start gap-6 px-4 py-6"
        onClick={e => e.stopPropagation()}
      >
        <p className="font-basic text-pink text-stroke-white text-2xl font-bold">Round {round}</p>
        <p className="font-basic text-ink text-base font-medium">사용할 숫자를 선택하세요</p>

        <div className="flex flex-wrap justify-center gap-2">
          {cards.map(card => (
            <button
              key={card}
              type="button"
              onClick={() => onSelectCard(card)}
              className="relative flex flex-col items-center"
            >
              <img src="/assets/card.png" alt="숫자카드" className="h-24 w-auto" />
              <span className="font-maple text-deep absolute inset-0 flex items-center justify-center text-base font-medium">
                {card}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default SelectModal;
