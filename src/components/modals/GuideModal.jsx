import Modal from './Modal';
import { FiX } from 'react-icons/fi';

function GuideModal({ onClose }) {
  return (
    <Modal>
      <div
        className="font-basic relative z-10 flex w-80 flex-col gap-4 rounded-xl bg-white px-4 py-8 shadow-md"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-pink-400 active:text-pink-500"
        >
          <FiX className="h-5 w-5" />
        </button>

        <h2 className="text-center text-lg font-semibold text-gray-800"> 🩶 게임 방법 🩶</h2>

        <div className="flex flex-col gap-4 text-[10px] leading-relaxed text-gray-700">
          <p className="text-xs font-bold">💡 게임 시작</p>
          <p>자동차 수, 라운드 수, 자동차 이름을 입력해 주세요.</p>

          <p className="text-xs font-bold">🤖 게임 진행</p>
          <p>
            1. 라운드 수만큼 <span className="text-deep">1~45 사이의 랜덤 숫자</span> 카드가
            생성됩니다.
          </p>
          <p>2. 각 라운드에서 카드 한 장을 선택해 제출해 주세요.</p>
          <p>3. 로봇보다 더 큰 숫자를 내면 해당 라운드를 승리합니다!</p>
          <p>4. 라운드를 이기면 트로피가 +1 증가하고, 자동차가 한 칸 앞으로 이동합니다.</p>
          <p>
            5. <span className="text-deep"> 골인 지점에 가장 가까이 도달한 자동차</span>가 최종
            우승합니다.
          </p>

          <p className="text-xs font-bold">🔥 기타 안내</p>
          <p>
            이 게임은 단순히 큰 숫자를 내는 것이 아니라,{' '}
            <span className="text-deep">가진 카드를 라운드별로 전략적으로 배분</span>하는 것이
            핵심입니다. 언제 큰 카드를 쓰고, 언제 작은 카드를 아껴둘지가 승패를 가르게 됩니다.
          </p>
          <p>
            모든 라운드 종료 후 최종 승패 결과를 확인할 수 있으며, 다시하기 버튼으로 새 게임을
            시작할 수 있습니다.
          </p>
          <p>그럼 행운을 빕니다! 🍀 </p>
        </div>
      </div>
    </Modal>
  );
}

export default GuideModal;
