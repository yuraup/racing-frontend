import useCanvas from '../../hooks/useCanvas';
import drawCanvas from '../../utils/drawCanvas';

function GameCanvas() {
  const canvasRef = useCanvas(drawCanvas);

  return (
    <div className="w-full flex-1">
      <canvas ref={canvasRef} className="h-full w-full rounded-2xl shadow-lg" />
    </div>
  );
}

export default GameCanvas;
