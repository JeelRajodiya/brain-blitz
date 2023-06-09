import * as React from "react";
import styles from "./UserQuizList.module.css";
import classNames from "classnames";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Image from "next/image";
type QuizList = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
  isDeleted: boolean;
};
async function deleteQuiz(
  quizId: string,
  setQuizListState: React.Dispatch<React.SetStateAction<QuizList[]>>
) {
  console.log(quizId);
  const res = await fetch("/api/createQuiz", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      id: quizId,
    },
  });
  if (res.status === 200) {
    setQuizListState((prev) =>
      prev.map((quiz) => {
        if (quiz.id === quizId) {
          quiz.isDeleted = true;
        }
        return quiz;
      })
    );
  }
}
export default function UserQuizList({ quizList }: { quizList: QuizList[] }) {
  const [tooltipText, setTooltipText] = React.useState("Click to copy");
  const [quizListState, setQuizListState] = React.useState(quizList);

  React.useEffect(() => {
    quizListState.map((quiz, index) => {
      quiz.isDeleted = false;
    });
  });
  return (
    <div className="flex  items-center flex-col mt-10 ">
      <div className="self-start text-xl p-5">Your Quizzes</div>

      <div className={styles.tableHeading}>
        <div className="p-2 ">Title</div>
        <div className="p-2 ">Code</div>
        <div className="p-2 ">Created At</div>
        <div className="p-2 ">Action</div>
      </div>

      {quizListState?.map((quiz, index) => {
        if (quiz.isDeleted) {
          return null;
        }

        return (
          <React.Fragment key={quiz.id}>
            <div
              className={classNames(
                `flex flex-row  justify-between items-center `,
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
              <div className="p-2 text-xs ">
                {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {/* Add a button here */}
              <div className="dropdown dropdown-hover justify-center flex dropdown-bottom">
                <label
                  tabIndex={0}
                  className="hover:bg-base-200 p-1 rounded-md"
                >
                  <Image
                    src="/icons/more_vert.png"
                    alt="more_vert"
                    width={25}
                    height={25}
                    className={styles.moreIcon}
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content shadow  bg-base-200 rounded-box z-50 p-2"
                >
                  <li>
                    <button className="btn btn-xs btn-ghost"> Edit</button>
                  </li>
                  <li>
                    <button
                      className="btn btn-xs btn-ghost"
                      onClick={() => deleteQuiz(quiz.id, setQuizListState)}
                    >
                      {" "}
                      Delete
                    </button>
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
