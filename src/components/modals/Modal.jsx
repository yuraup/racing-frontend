import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root') ?? document.body;

function Modal({ children }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="bg-light/90 relative z-10 mx-4 flex w-full max-w-[300px] items-center justify-center rounded-2xl">
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
