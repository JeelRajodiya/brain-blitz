import { useState } from "react";
export default function DifficultyTags() {
  const [difficultyRating, setDifficultyRating] = useState(1); // Set the default difficulty rating to 1 (Easy)

  const toggleDifficultyRating = (n) => {
    setDifficultyRating(n);
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
              className={`tooltip tooltip-success tooltip-top join-item bigRad radio ${
                difficultyRating === 1 ? "checked:bg-green-500" : ""
              }`}
              data-tip="Easy"
              type="radio"
              name="options"
              aria-label="Easy"
              onClick={() => toggleDifficultyRating(1)}
              defaultChecked={difficultyRating === 1} // Set the "Easy" radio button as defaultChecked
            />
            <input
              className={`tooltip tooltip-warning tooltip-top join-item bigRad radio ${
                difficultyRating === 2 ? "checked:bg-yellow-500" : ""
              }`}
              data-tip="Moderate"
              type="radio"
              name="options"
              aria-label="Moderate"
              onClick={() => toggleDifficultyRating(2)}
              defaultChecked={difficultyRating === 2} // Set the "Moderate" radio button as defaultChecked
            />
            <input
              className={`tooltip tooltip-error tooltip-top join-item bigRad radio ${
                difficultyRating === 3 ? "checked:bg-red-500" : ""
              }`}
              data-tip="Hard"
              type="radio"
              name="options"
              aria-label="Hard"
              onClick={() => toggleDifficultyRating(3)}
              defaultChecked={difficultyRating === 3} // Set the "Hard" radio button as defaultChecked
            />
          </div>
        </div>
        {/* ---------------------------------------- */}
      </div>
    </>
  );
}
