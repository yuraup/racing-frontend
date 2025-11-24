import { createPortal } from 'react-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const modalRoot = document.getElementById('modal-root') ?? document.body;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

function Modal({ children, transparent = false }) {
  return createPortal(
    <AnimatePresence>
      <Motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Motion.div
          className="absolute inset-0 bg-black/40"
          variants={backdropVariants}
          transition={{ duration: 0.35 }}
        />

        <Motion.div
          className={`relative z-10 mx-4 flex w-full max-w-[300px] items-center justify-center rounded-2xl ${
            transparent ? '' : 'bg-light/90'
          }`}
          variants={modalVariants}
          transition={{ duration: 0.35 }}
        >
          {children}
        </Motion.div>
      </Motion.div>
    </AnimatePresence>,
    modalRoot
  );
}

export default Modal;
