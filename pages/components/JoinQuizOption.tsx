import classnames from "classnames";
import { AnswerSheet } from "../../util/types";
import styles from "./JoinQuizOption.module.css";
import { ItoA } from "../../util/types";
import * as React from "react";
// Option component:
export default function Option({
  text,
  isSelected,
  index,
  setAnswerSheet,
  questionId,
}: {
  text: string;
  isSelected: boolean;
  index: number;
  setAnswerSheet: React.Dispatch<React.SetStateAction<AnswerSheet>>;
  questionId: string;
}) {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div
      className={classnames(styles.option, isSelected && styles.selectedOption)}
      onClick={() => {
        setAnswerSheet((prev) => {
          const newSheet = structuredClone(prev);
          if (newSheet[questionId] == ItoA[index]) {
            newSheet[questionId] = null;
          } else {
            newSheet[questionId] = ItoA[index];
          }
          return newSheet;
        });
      }}
    >
      {alphabets[index]}
      <div className="divider divider-horizontal"></div>
      {text}
    </div>
  );
}
