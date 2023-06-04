export default function DifficultyTag() {
  return (
    <>
      {/* Divider */}
      <div className="divider"></div>

      {/* Question Settings: */}
      <h1 className="text-2xl mb-4">Question Settings:</h1>
      <div>
        {/* difficulty tag: */}

        <div className="flex justify-between m-5">
          <label className="label m-5">
            <span className=" txtf label-text">Difficulty </span>
          </label>
          <div className="join m-5">
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Easy"
            />
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Moderate"
            />
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Hard"
            />
          </div>
        </div>
      </div>
    </>
  );
}
