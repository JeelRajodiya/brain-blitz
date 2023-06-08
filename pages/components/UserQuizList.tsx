import * as React from "react";
import styles from "./UserQuizList.module.css";
import classNames from "classnames";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

type QuizList = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
};
export default function UserQuizList({ quizList }: { quizList: QuizList[] }) {
  return (
    <div className="flex flex-col mt-10">
      <div className={styles.tableHeading}>
        <div className="p-2 ">Title</div>
        <div className="p-2 ">Code</div>
        <div className="p-2 ">Created At</div>
        <div className="p-2 ">Action</div>
      </div>

      {quizList.map((quiz, index) => {
        return (
          <div
            className={classNames(
              `flex flex-row  justify-between `,
              styles.displayTable
            )}
            key={quiz.id}
          >
            <div className="p-2 justify-self-start truncate ">{quiz.title}</div>
            <div className="p-2 justify-self-center">{quiz.code}</div>
            <div className="p-2 justify-self-end">
              {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {/* delete button goes here */}
            <div className="flex join">
              <DeleteButton onClick={console.log("Boom!")} />
              <EditButton onClick={console.log("Boom! but in reverse...")} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
