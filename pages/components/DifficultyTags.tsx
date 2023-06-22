import { useEffect, useState } from "react";

type Difficulty = 0 | 1 | 2 | 3;
export default function DifficultyTags({
  difficulty,
  setDifficulty,
}: {
  difficulty: Difficulty;
  setDifficulty: any;
}) {
  const toggleDifficultyRating = (n: Difficulty) => {
    setDifficulty(n);
    setDifficultyRating(n);
  };
  console.log(difficulty);
  const [difficultyRating, setDifficultyRating] = useState<Difficulty>(1); // Default difficulty rating is 1 -> easy

  useEffect(() => {
    setDifficultyRating(difficulty);
  }, [difficulty]);
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
              onChange={(e) =>
                toggleDifficultyRating(Number(e.target.value) as Difficulty)
              }
              value={1}
            />
            <input
              className={`tooltip tooltip-warning tooltip-top join-item w-16 h-10 radio ${
                difficulty === 2 ? "checked:bg-yellow-500" : ""
              }`}
              data-tip="Moderate"
              type="radio"
              name="options"
              aria-label="Moderate"
              onChange={(e) =>
                toggleDifficultyRating(Number(e.target.value) as Difficulty)
              }
              checked={difficultyRating === 2}
              value={2}
            />
            <input
              className={`tooltip tooltip-error tooltip-top join-item w-16 h-10 radio ${
                difficultyRating === 3 ? "checked:bg-red-500" : ""
              }`}
              data-tip="Hard"
              type="radio"
              name="options"
              aria-label="Hard"
              value={3}
              onChange={(e) =>
                toggleDifficultyRating(Number(e.target.value) as Difficulty)
              }
              checked={difficulty === 3}
            />
          </div>
        </div>
        {/* ---------------------------------------- */}
      </div>
    </>
  );
}
