import React, { useState } from "react";
import DeleteQuizToast from "./DeleteQuizToast";
import styles from "./CreatedQuizList.module.css";
import { QuizList } from "../../util/types";
import Image from "next/image";
import classNames from "classnames";
import { deleteQuiz } from "../../util/functions";
export default function CreatedQuizList({
  quizList,
}: {
  quizList: QuizList[];
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusCode, setStatusCode] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [visibleEntries, setVisibleEntries] = React.useState(5);

  const [tooltipText, setTooltipText] = React.useState("Click to copy");
  const [quizListState, setQuizListState] =
    React.useState<QuizList[]>(quizList);

  let entries = 0;
  if (quizListState !== undefined) {
    quizListState.map((quiz, index) => {
      if (!quiz.isDeleted) {
        entries++;
      }
    });
  }

  React.useEffect(() => {
    quizListState.map((quiz, index) => {
      quiz.isDeleted = false;
    });
  }, []);

  return (
    <>
      <div className={styles.tableHeading}>
        <div>Title</div>
        <div>Code</div>
        <div>Created At</div>
        <div>Action</div>
      </div>

      {quizListState?.slice(0, visibleEntries).map((quiz, index) => {
        // {quizListState?.map((quiz, index) => {
        if (quiz.isDeleted) {
          return null;
        }

        return (
          <React.Fragment key={quiz.id}>
            <div
              className={classNames(
                `flex flex-row  justify-between items-center `,
                styles.tableElement
              )}
            >
              <div className="truncate">{quiz.title}</div>
              <div
                className="tooltip tooltip-top tooltip-info cursor-pointer"
                data-tip={tooltipText}
                onClick={() => {
                  navigator.clipboard.writeText(quiz.code);
                  setTooltipText("Copied");
                  setTimeout(() => setTooltipText("Click to copy"), 700);
                }}
              >
                {quiz.code}
              </div>
              <div className=" text-xs ">
                {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {/* Add a button here */}
              
              <div className="dropdown dropdown-hover dropdown-bottom">
                <label tabIndex={0} className="hover:bg-base-200  rounded-md">
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
                  className="dropdown-content shadow bg-base-300 rounded-box z-50 p-2"
                >
                  <li>
                    <button className="btn btn-xs"> Edit</button>
                  </li>
                  <li>
                    <dialog id={`deleteQuizModal${index}`} className="modal">
                      <form method="dialog" className="modal-box">
                        <button
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          ✕
                        </button>
                        <h1
                          className="font-bold text-lg"
                          style={{ color: "white" }}
                        >
                          Delete
                        </h1>
                        <p
                          className="py-4"
                          style={{ color: "white", fontSize: "16px" }}
                        >
                          Are you sure you want to delete the quiz:{" "}
                          <span className="font-bold">{quiz.title}</span>
                        </p>
                        <button
                          className="btn bg-red-500 hover:bg-red-600 text-white"
                          onClick={() =>
                            deleteQuiz(
                              quiz.id,
                              setQuizListState,
                              setIsLoading,
                              setErrorMsg,
                              setStatusCode
                            )
                          }
                        >
                          Delete
                        </button>
                      </form>
                    </dialog>
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        // @ts-ignore
                        window[`deleteQuizModal${index}`].showModal()
                      }
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {entries > 5 && quizListState.length > visibleEntries && (
        <button
          className="btn w-4/5 join-item m-5 btn-outline btn-accent"
          onClick={() => setVisibleEntries(visibleEntries + 5)}
        >
          Show More
        </button>
      )}
      <DeleteQuizToast
        statusCode={statusCode}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </>
  );
}
