import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FiHelpCircle } from 'react-icons/fi';
import { useState } from 'react';
import GuideModal from '../components/modals/guideModal';

export const LandingPage = () => {
  const navigate = useNavigate();

  const [openGuide, setOpenGuide] = useState(false);

  const handleStartClick = () => {
    const audio = document.getElementById('bgm-audio');
    if (audio && 'play' in audio) {
      audio.play().catch(e => {
        console.warn('BGM 재생 실패:', e);
      });
    }
    navigate('/setup');
  };

  const handleGuideClick = () => {
    setOpenGuide(true);
  };

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
            onClick={handleStartClick}
          >
            start
          </button>
          <button
            type="button"
            onClick={handleGuideClick}
            className="group font-basic hover-text-shadow-pink active-text-shadow-pink flex items-center gap-1 px-3 py-1 text-sm font-light text-white"
          >
            <FiHelpCircle className="group-hover:text-pink h-4 w-4 transition-transform group-hover:scale-110 group-active:scale-95 group-active:text-pink-500" />
            <span>게임 방법</span>
            {openGuide && <GuideModal onClose={() => setOpenGuide(false)} />}
          </button>
        </div>
      </div>
    </Motion.div>
  );
};
