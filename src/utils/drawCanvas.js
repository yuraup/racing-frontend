import { BASE_WIDTH, BASE_HEIGHT } from '../constants/canvas/canvasBase';
import { GOAL } from '../constants/canvas/canvasGoal';
import { START } from '../constants/canvas/canvasStart';
import { CARS } from '../constants/canvas/canvasCars';
import { COLORS } from '../constants/canvas/canvasColors';

/**
 * 캔버스 크기로 게임 화면 그리는 함수
 * BASE_WIDTH와 HEIGHT 비율을 기준으로 sx, sy로 스케일링
 * @param {HTMLCanvasElement} canvasElement - 실제 DOM 캔버스 요소
 * @param {CanvasRenderingContext2D} canvas2DContext - 2D 렌더링 컨텍스트
 * @param {string []} carNames - 각 자동차 이름
 */
const drawCanvas = (canvasElement, canvas2DContext, carNames, carProgress) => {
  const { width: canvasWidth, height: canvasHeight } = canvasElement.getBoundingClientRect();

  const centerX = canvasWidth / 2;

  const sx = v => (v / BASE_WIDTH) * canvasWidth;
  const sy = v => (v / BASE_HEIGHT) * canvasHeight;

  canvas2DContext.fillStyle = COLORS.BACKGROUND;
  canvas2DContext.fillRect(0, 0, canvasWidth, canvasHeight);

  //GOAL
  const goalImage = new Image();
  goalImage.src = GOAL.IMG_SRC;

  const goalWidth = sx(GOAL.WIDTH);
  const goalHeight = sy(GOAL.HEIGHT);
  const goalX = centerX - goalWidth / 2;
  const goalY = sy(GOAL.Y);

  goalImage.onload = () => {
    canvas2DContext.drawImage(goalImage, goalX, goalY, goalWidth, goalHeight);
  };

  const goalLineWidth = sx(GOAL.LINE_WIDTH);
  const goalLineHeight = sy(GOAL.LINE_HEIGHT);
  const goalLineX = centerX - goalLineWidth / 2;
  const goalLineY = goalY + goalHeight + sy(GOAL.LINE_GAP);

  canvas2DContext.fillStyle = COLORS.GOAL_LINE;
  canvas2DContext.fillRect(goalLineX, goalLineY, goalLineWidth, goalLineHeight);

  // START
  const startTextY = goalLineY + sy(START.TEXT_GAP_FROM_GOAL_LINE);
  const startFontSize = sy(START.FONT_SIZE);

  canvas2DContext.fillStyle = COLORS.START_TEXT;
  canvas2DContext.font = `700 ${startFontSize}px Inter`;
  canvas2DContext.textAlign = 'center';
  canvas2DContext.textBaseline = 'middle';
  canvas2DContext.fillText(START.TEXT, centerX, startTextY);

  const startLineWidth = sx(START.LINE_WIDTH);
  const startLineHeight = sy(START.LINE_HEIGHT);
  const startLineX = centerX - startLineWidth / 2;
  const startLineY = startTextY + sy(START.LINE_GAP);

  canvas2DContext.fillStyle = COLORS.START_LINE;
  canvas2DContext.fillRect(startLineX, startLineY, startLineWidth, startLineHeight);

  // 자동차
  const baseCarAreaY = startLineY + sy(CARS.TOP_GAP);
  const carWidth = sx(CARS.WIDTH);
  const carHeight = sy(CARS.HEIGHT);
  const carGap = sx(CARS.GAP);
  const carNameFontSize = sy(CARS.NAME_FONT_SIZE);

  const stepY = sy(CARS.STEP_Y);
  const names = carNames;

  CARS.SOURCES.forEach((src, index) => {
    const carCenterX = centerX + (index - 1) * carGap;

    const progress = carProgress[index] || 0;
    const carCenterY = baseCarAreaY - stepY * progress;
    const carImage = new Image();
    carImage.src = src;

    carImage.onload = () => {
      canvas2DContext.drawImage(
        carImage,
        carCenterX - carWidth / 2,
        carCenterY - carHeight / 2,
        carWidth,
        carHeight
      );

      canvas2DContext.fillStyle = COLORS.CAR_NAME;
      canvas2DContext.font = `500 ${carNameFontSize}px Inter`;
      canvas2DContext.textAlign = 'center';
      canvas2DContext.textBaseline = 'top';
      canvas2DContext.fillText(
        names[index],
        carCenterX,
        carCenterY + carHeight / 2 + sy(CARS.NAME_TOP_GAP)
      );
    };
  });
};

export default drawCanvas;
