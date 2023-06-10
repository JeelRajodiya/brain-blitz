import * as React from "react";
import { useRouter } from "next/router";
import UserQuizList from "./UserQuizList";
import UserQuizListSkeleton from "./UserQuizListSkeleton";
import styles from "./QuizActions.module.css";
import classNames from "classnames";

async function fetchQuizList() {
  const res = await fetch("/api/listUserQuizzes", {
    method: "GET",
  });
  const json = await res.json();
  return json;
}

declare const window: Window &
  typeof globalThis & {
    joinQuizModal: {
      showModal: () => void;
      close: () => void;
      open: boolean;
    };
  };

function QuizForm() {
  const joinQuiz = () => {
    console.log("join quiz");
  };

  const router = useRouter();

  const [quizCode, setQuizCode] = React.useState("");
  const [quizList, setQuizList] = React.useState();
  const [isListLoading, setIsListLoading] = React.useState(true);

  React.useEffect(() => {
    fetchQuizList()
      .then((res) => {
        setQuizList(res);
        setIsListLoading(false);
        console.log("done");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  React.useEffect(() => {
    if (router.query.quizCode) {
      setQuizCode(router.query.quizCode as string);
      console.log(window.joinQuizModal.open);
      if (window.joinQuizModal.open) {
        return;
      }
      window.joinQuizModal.showModal();
    }
  }, [!router.query.quizCode]);

  return (
    <div>
      <div
        className={classNames("join", styles.joinB)}
        style={{ marginTop: "40px" }}
      >
        <button
          className={classNames("btn ", styles.joinq, styles["btn-modified"])}
          onClick={() => {
            router.push({
              pathname: "/Dashboard",
              query: {
                quizCode: "",
              },
            });
            window.joinQuizModal.showModal();
            setQuizCode("");
          }}
        >
          Join Quiz
        </button>
        <dialog id="joinQuizModal" className="modal">
          <form method="dialog" className="modal-box">
            <button
              // htmlFor="my-modal-3"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-600"
              style={{ color: "white" }}
              onClick={() => {
                router.push("/Dashboard");
              }}
            >
              ✕
            </button>
            <h3
              className="font-bold text-2xl text-center"
              style={{ color: "white" }}
            >
              ⚡Join Quiz⚡
            </h3>

            <div className="join m-5 flex justify-center">
              <input
                className="input join-item w-64 rounded-r-none"
                placeholder="Write the quiz code to join quiz"
                style={{
                  fontSize: "1rem",
                  borderRadius: "1rem 0 0 1rem",
                  borderColor: "white",
                  color: "white",
                }}
                value={quizCode}
                onChange={(e) => {
                  setQuizCode(e.target.value);
                  router.push({
                    pathname: "/Dashboard",
                    query: {
                      quizCode: e.target.value,
                    },
                  });
                }}
              />
              <button
                className="btn join-item rounded-full"
                style={{ borderRadius: "0 1rem 1rem 0", borderColor: "white" }}
              >
                Join!
              </button>
            </div>
          </form>
        </dialog>

        <button
          className={classNames("btn ", styles.create, styles["btn-modified"])}
          onClick={() => router.push("/NewQuiz")}
        >
          Create Quiz
        </button>
      </div>
      {!isListLoading ? (
        <UserQuizList quizList={quizList} />
      ) : (
        <UserQuizListSkeleton />
      )}
    </div>
  );
}

export default QuizForm;
