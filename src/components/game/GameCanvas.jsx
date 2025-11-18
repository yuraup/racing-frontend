import { useCallback } from 'react';
import useCanvas from '../../hooks/useCanvas';
import drawCanvas from '../../utils/drawCanvas';

function GameCanvas({ carProgress, carNames, totalRounds }) {
  const draw = useCallback(
    (canvasElement, canvas2DContext) => {
      drawCanvas(canvasElement, canvas2DContext, carNames, carProgress, totalRounds);
    },
    [carProgress, carNames, totalRounds]
  );
  const canvasRef = useCanvas(draw);

  return (
    <div className="w-full flex-1">
      <canvas ref={canvasRef} className="h-full w-full shadow-lg md:rounded-2xl" />
    </div>
  );
}

export default GameCanvas;
