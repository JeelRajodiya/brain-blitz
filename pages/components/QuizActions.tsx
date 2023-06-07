import * as React from "react";
import { useRouter } from "next/router";
import UserQuizList from "./UserQuizList";

async function fetchQuizList() {
  const res = await fetch("/api/listUserQuizzes", {
    method: "GET",
  });
  const json = await res.json();
  return json;
}
declare const window: Window &
  typeof globalThis & {
    my_modal_3: {
      showModal: () => void;
      close: () => void;
    };
  };
function QuizForm() {
  const joinQuiz = () => {
    console.log("join quiz");
  };

  const router = useRouter();

  const [quizCode, setQuizCode] = React.useState("");
  const [quizList, setQuizList] = React.useState([]);

  React.useEffect(() => {
    fetchQuizList().then((res) => {
      setQuizList(res);
    });
  }, []);
  React.useEffect(() => {
    if (router.query.quizCode) {
      setQuizCode(router.query.quizCode as string);
      window.my_modal_3.close();
      window.my_modal_3.showModal();
    }
  }, [!router.query.quizCode]);

  return (
    <div>
      <div className="join joinB" style={{ marginTop: "40px" }}>
        <button
          className="btn btn-modified joinq"
          onClick={() => {
            router.push({
              pathname: "/Dashboard",
              query: {
                quizCode: "",
              },
            });
            window.my_modal_3.showModal();
            setQuizCode("");
          }}
        >
          Join Quiz
        </button>
        <dialog id="my_modal_3" className="modal">
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
          className="btn btn-modified create"
          onClick={() => router.push("/NewQuiz")}
        >
          Create Quiz
        </button>
      </div>
      {quizList ? <UserQuizList quizList={quizList} /> : ""}
    </div>
  );
}

export default QuizForm;
