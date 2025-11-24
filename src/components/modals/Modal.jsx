import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root') ?? document.body;

function Modal({ children, transparent = false }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`relative z-10 mx-4 flex w-full max-w-[300px] items-center justify-center rounded-2xl ${transparent ? '' : 'bg-light/90'} `}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
