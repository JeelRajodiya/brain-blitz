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
  const [tooltipText, setTooltipText] = React.useState("Click to copy");
  return (
    <div className="flex  items-center flex-col mt-10 ">
      <div className="self-start text-xl p-5">Your Quizzes</div>

      <div className={styles.tableHeading}>
        <div className="p-2 ">Title</div>
        <div className="p-2 ">Code</div>
        <div className="p-2 ">Created At</div>
        <div className="p-2 ">Action</div>
      </div>

      {quizList?.map((quiz, index) => {
        return (
          <React.Fragment key={quiz.id}>
            <div
              className={classNames(
                `flex flex-row  justify-between `,
                styles.displayTable
              )}
            >
              <div className="p-2">{quiz.title}</div>
              <div
                className="p-2 tooltip tooltip-top tooltip-info cursor-pointer"
                data-tip={tooltipText}
                onClick={() => {
                  navigator.clipboard.writeText(quiz.code);
                  setTooltipText("Copied");
                  setTimeout(() => setTooltipText("Click to copy"), 700);
                }}
              >
                {quiz.code}
              </div>
              <div className="p-2 ">
                {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {/* Add a button here */}
              <div className="dropdown dropdown-hover dropdown-bottom">
                <label tabIndex={0} className="btn m-1">
                  ...
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content shadow  bg-base-200 rounded-box z-50 p-2"
                >
                  <li>
                    <button className="btn btn-xs btn-ghost"> Edit</button>
                  </li>
                  <li>
                    <button className="btn btn-xs btn-ghost"> Delete</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.line}></div>
          </React.Fragment>
        );
      })}
    </div>
  );
}