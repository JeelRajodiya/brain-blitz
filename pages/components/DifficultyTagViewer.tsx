import { Difficulty } from "../../util/types";
import classnames from "classnames";
export default function DifficultyTag({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  if (!difficulty) {
    console.warn("Difficulty can not be " + difficulty);
    return null;
  }
  let badgeClass;
  if (difficulty == "Easy") {
    badgeClass = "badge badge-success";
  } else if (difficulty == "Medium") {
    badgeClass = "badge badge-warning";
  } else if (difficulty == "Hard") {
    badgeClass = "badge badge-error";
  } else {
    throw new Error(
      `Expected a difficulty in only "Easy", "Medium", "Hard" got ${difficulty}`
    );
  }
  return <div className={classnames(badgeClass, "p-3 m-1")}>{difficulty}</div>;
}
