const Scoreboard = ({ round, score }) => {
  return (
    <div className="flex gap-8 bg-slate-50 p-2 px-8 rounded-full">
      <div className="flex flex-col">
        <div className="text-xs">Round:</div>
        <div className="text-md font-medium">{round}/5</div>
      </div>
      <div className="flex flex-col">
        <div className="text-xs">Score:</div>
        <div className="text-md font-medium">{score}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
