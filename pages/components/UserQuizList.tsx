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
    <div className="flex flex-col mt-10">
      <div
        className="flex flex-row justify-between displayTable border-b-2 text-xl bg-base-200"
        style={{
          fontWeight: "bold",
          borderBottomRightRadius: "0",
          borderBottomLeftRadius: "0",
        }}
      >
        <div className="p-2">Title</div>
        <div className="p-2">Code</div>
        <div className="p-2">Created At</div>
      </div>

      {quizList.map((quiz, index) => {
        const isOdd = index % 2 === 1;
        return (
          <div
            className={classNames(
              `flex flex-row  justify-between ${isOdd ? "bg-base-200" : ""}`,
              styles.displayTable
            )}
            key={quiz.id}
          >
            <div className="p-2 justify-self-start">{quiz.title}</div>
            <div className="p-2 justify-self-center">{quiz.code}</div>
            <div className="p-2 justify-self-end">
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
