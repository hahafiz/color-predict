const Scoreboard = ({ round, score }) => {
  return (
    <div className="flex gap-4">
      <div>Round {round}/5</div>
      <div>Score: {score}</div>
    </div>
  );
};

export default Scoreboard;
