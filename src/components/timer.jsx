import { useState, useEffect } from "react";

const Timer = ({ onTimeUp, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(30);

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
    <div className="bg-slate-50 p-2 px-8 rounded-full">
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
