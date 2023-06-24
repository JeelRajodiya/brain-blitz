import classnames from "classnames";
import styles from "./QuestionBoxes.module.css";
export default function QuestionBoxes({
  numberOfQuestions,
  setActiveQuestion,
  activeQuestion,
}: {
  numberOfQuestions: number;
  setActiveQuestion: (prev: number) => void;
  activeQuestion: number;
}) {
  const questionsBoxes: React.ReactNode[] = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    if (i == activeQuestion - 1) {
      questionsBoxes.push(
        <div
          key={i}
          className={classnames(styles.questionBoxActive, styles.questionBox)}
        >
          {i + 1}
        </div>
      );
      continue;
    }
    questionsBoxes.push(
      <div
        className={styles.questionBox}
        onClick={() => {
          setActiveQuestion(i + 1);
        }}
        key={i}
      >
        {i + 1}
      </div>
    );
  }

  return <>{questionsBoxes}</>;
}
