export function moveAnimation({
  winnerCarIndex,
  animatedProgress,
  setAnimatedProgress,
  duration = 1000,
}) {
  if (winnerCarIndex == null) return;

  const startTime = performance.now();
  const from = animatedProgress[winnerCarIndex];
  const to = from + 1;

  const step = now => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    setAnimatedProgress(prev =>
      prev.map((value, index) => (index === winnerCarIndex ? from + (to - from) * eased : value))
    );

    if (t < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
