import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import Timer from "./components/timer";
import Scoreboard from "./components/scoreboard";

// TODO: change name to colorGuess
// TODO: add a timer
// TODO: add a round number up to 5, score
// TODO: figure out score logic -> calculate difference between hexcode vs user input -> the further the difference the lower the score
// TODO: figure out how to put # input field
// TODO: make the whole page background color as the random hexcode
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
    <div className="flex flex-col justify-center h-screen w-screen">
      <Scoreboard round={round} score={score} />
      <Timer onTimeUp={handleTimeUp} resetTrigger={resetTimer} />
      <div className="flex justify-center items-center">
        <div className="flex-row w-full">
          <div
            className="containerrounded-sm min-h-[600px]"
            style={{ backgroundColor: backgroundColor }}
          ></div>
          <form
            onSubmit={handleSubmit}
            className="container mx-auto py-8 max-w-48"
          >
            <label className="relative block pb-4">
              <span className="sr-only">Guess the hex code</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  className="h-5 w-5 fill-slate-300"
                  viewBox="0 0 20 20"
                ></svg>
              </span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Guess the hex code"
                type="text"
                name="hexcode"
              />
            </label>
            <Button type="submit" className="w-full">
              Guess
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
