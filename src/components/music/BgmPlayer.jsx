import { useRef, useState } from 'react';

export default function BgmPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playBgm = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.warn('BGM 재생 실패:', e);
    }
  };

  const toggleBgm = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      playBgm();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <audio id="bgm-audio" ref={audioRef} src="/sounds/racing-bgm.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggleBgm}
        className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white"
      >
        {isPlaying ? 'BGM OFF' : 'BGM ON'}
      </button>
    </div>
  );
}
