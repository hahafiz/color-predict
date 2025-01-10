import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";

// TODO: change name to colorGuess
// TODO: add a timer
// TODO: add a round number up to 5, score
// TODO: figure out score logic -> calculate difference between hexcode vs user input -> the further the difference the lower the score
const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#000000");

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

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex-row w-full">
        <div
          className="containerrounded-sm min-h-[600px]"
          style={{ backgroundColor: backgroundColor }}
        ></div>
        <form className="container mx-auto py-8 max-w-48">
          <label className="relative block pb-4">
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
          <Button className="w-full">Guess</Button>
        </form>
      </div>
    </div>
  );
};

export default App;
