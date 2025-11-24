import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full justify-center"
    >
      <div className="flex h-full w-full justify-center">
        <div className="bg-ink flex h-full w-64 flex-col items-center justify-center gap-4 pb-20">
          <img src="/assets/gimbab.png" alt="삼각김밥" className="h-14 w-14 object-contain" />
          <p className="font-basic text-4xl font-bold text-white">삼각김밥 레이스</p>
          <p className="font-pixel text-xs font-normal text-white">
            최고의 삼각김밥 재료를 신속히 배달해라.
          </p>
          <button
            type="button"
            className="font-basic hover-text-shadow-pink active-text-shadow-pink text-3xl font-light text-white"
            onClick={() => navigate('/setup')}
          >
            start
          </button>
        </div>
      </div>
    </Motion.div>
  );
};
