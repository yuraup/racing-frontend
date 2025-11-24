import { useRef, useEffect } from 'react';

/**
 * Canvas에 자동 리사이즈와 리렌더링을 적용하는 Hook
 * @param {(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void} drawCanvas
 * @returns {React.RefObject<HTMLCanvasElement>}
 */
const useCanvas = drawCanvas => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvas2DContext = canvasElement.getContext('2d');
    if (!canvas2DContext) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvasElement.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      canvasElement.width = displayWidth * dpr;
      canvasElement.height = displayHeight * dpr;

      canvas2DContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvas2DContext.clearRect(0, 0, displayWidth, displayHeight);
      drawCanvas(canvasElement, canvas2DContext);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawCanvas]);

  return canvasRef;
};

export default useCanvas;
