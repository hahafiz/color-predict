import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import Timer from "./components/timer";
import Scoreboard from "./components/scoreboard";

// TODO: change name to colorGuess
// TODO: figure out how to put # input field
// TODO: make the whole page background color as the random hexcode
// TODO: add reset button
// TODO: refactor code
const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  const generateRandomColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"); // this ensure that the color is 6 characters long
    setBackgroundColor(randomColor);
  };

  // generate color when componenet mounts
  useEffect(() => {
    generateRandomColor();
  }, []); // empty array ensures that the effect only runs once

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form refreshing the page
    const userInput = e.target.hexcode.value; // user value input
    console.log("User guessed: ", userInput);
    scoreLogic(backgroundColor, userInput);

    if (round < 5) {
      setRound((prevRound) => prevRound + 1);
      generateRandomColor(); // generate a new color for next round
      setResetTimer((prev) => prev + 1);
    } else {
      // TODO: game over screen
      console.log("Game Over!");
    }
  };

  const handleTimeUp = () => {
    console.log("Time's up!");
    // TODO: time-up screen
  };

  const scoreLogic = (color, userInput) => {
    const [r, g, b] = color
      .slice(1)
      .match(/.{2}/g)
      .map((hex) => parseInt(hex, 16));
    const [userR, userG, userB] = userInput
      .match(/.{2}/g)
      .map((hex) => parseInt(hex, 16));

    const rDiff = Math.abs(r - userR);
    const gDiff = Math.abs(g - userG);
    const bDiff = Math.abs(b - userB);

    const totalDifference = rDiff + gDiff + bDiff;
    // console.log("total difference: ", totalDifference);

    const normalizedDiff = totalDifference / 765;
    // console.log("normalized difference: ", normalizedDiff);

    const maxScore = 1000;
    const rawScore = (1 - normalizedDiff) * maxScore;
    // console.log("raw score: ", rawScore);

    const finalScore = Math.max(0, Math.round(rawScore));
    // console.log("final score: ", finalScore);

    setScore((prevScore) => prevScore + finalScore);
  };

  return (
    <div
      className="flex flex-col justify-between h-screen py-16 px-8"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="flex justify-between items-center">
        <div className="bg-slate-50 p-2 px-8 rounded-full text-xl">
          ColorGuess
        </div>
        <Timer onTimeUp={handleTimeUp} resetTrigger={resetTimer} />
        <Scoreboard round={round} score={score} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center align-center"
      >
        <label className="relative block pb-2">
          <span className="sr-only">Guess the hex code</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Guess the hex code"
            type="text"
            name="hexcode"
          />
        </label>
        <Button type="submit" className="h-10 w-1/4">
          Guess
        </Button>
      </form>
    </div>
  );
};

export default App;
