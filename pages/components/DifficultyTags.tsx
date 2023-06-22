import { useState } from "react";
import { Question } from "./Option";
export default function DifficultyTags({
  difficulty,
  setDifficulty,
}: {
  difficulty: number;
  setDifficulty: any;
}) {
  const toggleDifficultyRating = (n: number) => {
    setDifficulty(n);
    setDifficultyRating(n);
  };
  const [difficultyRating, setDifficultyRating] = useState(1); // Default difficulty rating is 1 -> easy
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
              checked={difficultyRating === 1}
              onChange={() => toggleDifficultyRating(1)}
            />
            <input
              className={`tooltip tooltip-warning tooltip-top join-item w-16 h-10 radio ${
                difficulty === 2 ? "checked:bg-yellow-500" : ""
              }`}
              data-tip="Moderate"
              type="radio"
              name="options"
              aria-label="Moderate"
              onChange={() => toggleDifficultyRating(2)}
              checked={difficultyRating === 2}
            />
            <input
              className={`tooltip tooltip-error tooltip-top join-item w-16 h-10 radio ${
                difficultyRating === 3 ? "checked:bg-red-500" : ""
              }`}
              data-tip="Hard"
              type="radio"
              name="options"
              aria-label="Hard"
              onChange={() => toggleDifficultyRating(3)}
              checked={difficulty === 3}
            />
          </div>
        </div>
        {/* ---------------------------------------- */}
      </div>
    </>
  );
}
