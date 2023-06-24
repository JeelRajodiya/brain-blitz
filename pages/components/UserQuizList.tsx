import * as React from "react";
import styles from "./UserQuizList.module.css";
import classNames from "classnames";
// import DeleteButton from "./DeleteButton";
// import EditButton from "./EditButton";
import Image from "next/image";
import { deleteQuiz } from "../../util/functions";
import { QuizList } from "../../util/types";
declare const window: Window &
  typeof globalThis & {
    deleteQuizModal: {
      showModal: () => void;
      close: () => void;
      open: boolean;
    };
  };

// component for the toast message when quiz is deleted
const toastMsg = () => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-success">
        <span>Quiz is successfully deleted!</span>
      </div>
      <div className="alert alert-error">
        <span>Error in deleting the quiz!</span>
      </div>
    </div>
  );
};

export default function UserQuizList({ quizList }: { quizList: QuizList[] }) {
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

  // console.log(entries); // it works

  React.useEffect(() => {
    quizListState.map((quiz, index) => {
      quiz.isDeleted = false;
    });
  }, []);

  const [visibleEntries, setVisibleEntries] = React.useState(5);

  // Added tabs!
  const [SelectedTab, setSelectedTab] = React.useState("made");
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  if (entries === 0) {
    return (
      <div className="flex justify-center items-center mt-5">
        <div className="card mx-10 lg:w-100 bg-base-200 shadow-xl">
          <div className="card-body">
              <p>You have not creaated any quiz yet!</p>
          </div>
        </div>
      </div>
    );
  }

  //   console.log(quizListState.length, visibleEntries);

  return (
    <div className="flex  items-center flex-col mt-10 ">
      <div className="self-center text-xl m-2 ">Your Quizzes</div>

      <div className="tabs tabs-boxed  mb-2">
        <a
          className={`tab tab-md ${SelectedTab === "made" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("made")}
        >
          Made
        </a>
        <a
          className={`tab tab-md ${
            SelectedTab === "participated" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("participated")}
        >
          Participated
        </a>
      </div>

      <div className={styles.tableHeading}>
        <div className="p-2 ">Title</div>
        <div className="p-2 ">Code</div>
        <div className="p-2 ">Created At</div>
        <div className="p-2 ">Action</div>
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
                styles.displayTable
              )}
            >
              <div className="p-2 truncate">{quiz.title}</div>
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
                          ⚠️ Delete ⚠️
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
                          onClick={() => deleteQuiz(quiz.id, setQuizListState)}
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
            <div className={styles.line}></div>
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
    </div>
  );
}
