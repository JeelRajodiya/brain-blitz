import { useState } from "react";
import { Question } from "./Option";
export default function DifficultyTags({
  difficulty,
  setDifficulty,
}: {
  difficulty: number;
  setDifficulty: any;
}) {
  const toggleDifficultyRating = (n) => {
    setDifficulty(n);
  };

  return (
    <>
      {/* Divider */}
      <div className="divider"></div>

      <h1 className="text-2xl mb-4">Question Settings:</h1>
      <div>
        {/* -----------Difficulty tag------------------ */}
        <div className="flex flex-row justify-between m-5">
          <label className="label m-5">
            <span className="txtf label-text">Difficulty </span>
          </label>

          <div className="join m-5 mt-6">
            <input
              className={`tooltip tooltip-success tooltip-top join-item w-16 h-10 radio ${
                difficulty === 1 ? "checked:bg-green-500" : ""
              }`}
              data-tip="Easy"
              type="radio"
              name="options"
              aria-label="Easy"
              onClick={() => toggleDifficultyRating(1)}
              defaultChecked={difficulty === 1} // Set the "Easy" radio button as defaultChecked
            />
            <input
              className={`tooltip tooltip-warning tooltip-top join-item w-16 h-10 radio ${
                difficulty === 2 ? "checked:bg-yellow-500" : ""
              }`}
              data-tip="Moderate"
              type="radio"
              name="options"
              aria-label="Moderate"
              onClick={() => toggleDifficultyRating(2)}
              defaultChecked={difficulty === 2} // Set the "Moderate" radio button as defaultChecked
            />
            <input
              className={`tooltip tooltip-error tooltip-top join-item w-16 h-10 radio ${
                difficulty === 3 ? "checked:bg-red-500" : ""
              }`}
              data-tip="Hard"
              type="radio"
              name="options"
              aria-label="Hard"
              onClick={() => toggleDifficultyRating(3)}
              defaultChecked={difficulty === 3} // Set the "Hard" radio button as defaultChecked
            />
          </div>
        </div>
        {/* ---------------------------------------- */}
      </div>
    </>
  );
}
