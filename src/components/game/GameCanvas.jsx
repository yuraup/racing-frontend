import { useCallback } from 'react';
import useCanvas from '../../hooks/useCanvas';
import drawCanvas from '../../utils/drawCanvas';

function GameCanvas({ carNames }) {
  const draw = useCallback(
    (canvasElement, canvas2DContext) => {
      drawCanvas(canvasElement, canvas2DContext, carNames);
    },
    [carNames]
  );
  const canvasRef = useCanvas(draw);

  return (
    <div className="w-full flex-1">
      <canvas ref={canvasRef} className="h-full w-full rounded-2xl shadow-lg" />
    </div>
  );
}

export default GameCanvas;
