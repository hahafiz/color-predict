import { useState, useEffect } from "react";

const Timer = ({ onTimeUp, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const INITIAL_TIME = 30;

  // calculate progress percentage
  const progress = (timeLeft / INITIAL_TIME) * 100;

  // reset timer when resetTrigger changes
  useEffect(() => {
    setTimeLeft(30);
  }, [resetTrigger]);

  useEffect(() => {
    // only start the timer if the timeleft > 0
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // cleanup: clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (time) => {
    return `00:${time.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      {/* Container with gradient border background */}
      <div
        className="bg-gradient-to-r from-slate-200 to-blue-500 p-[2px] rounded-full"
        style={{
          backgroundSize: `${progress}% 100%`,
          backgroundRepeat: "no-repeat",
          transition: "background-size 1s linear",
        }}
      >
        {/* Inner content container */}
        <div className="bg-slate-50 p-2 px-8 rounded-full text-2xl">
          <p>{formatTime(timeLeft)}</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
