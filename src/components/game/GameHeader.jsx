function GameHeader({ myWins }) {
  return (
    <div className="absolute top-0 z-40 flex h-14 w-full items-center gap-2">
      <img src="/assets/score.png" className="mt-4 ml-4 h-8 w-8" alt="트로피" />
      <span className="font-pixel text-pink text-2xl font-medium">{'❤ '.repeat(myWins)}</span>
    </div>
  );
}

export default GameHeader;
