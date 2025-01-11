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

  return (
    <div>
      <p>{timeLeft} seconds</p>
    </div>
  );
};

export default Timer;
