import * as React from "react";
import styles from "./UserQuizList.module.css";
import classNames from "classnames";
type QuizList = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
};
export default function UserQuizList({ quizList }: { quizList: QuizList[] }) {
  return (
    <div className="flex  items-center flex-col mt-10">
      <div className={styles.tableHeading}>
        <div className="p-2">Title</div>
        <div className="p-2">Code</div>
        <div className="p-2">Created At</div>
      </div>

      {quizList?.map((quiz, index) => {
        return (
          <div
            className={classNames(
              `flex flex-row  justify-between `,
              styles.displayTable
            )}
            key={quiz.id}
          >
            <div className="p-2   ">{quiz.title}</div>
            <div className="p-2 ">{quiz.code}</div>
            <div className="p-2 ">
              {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
