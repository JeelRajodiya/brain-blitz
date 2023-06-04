import * as React from "react";
import { useRouter } from "next/router";

function QuizForm() {
  const joinQuiz = () => {
    console.log("join quiz");
  };

  const router = useRouter();
  return (
    <div>
      <div className="join joinB" style={{ marginTop: "40px" }}>
        <button
          className="btn btn-modified joinq"
          onClick={() => window.my_modal_3.showModal()}
        >
          Join Quiz
        </button>
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button
              // htmlFor="my-modal-3"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              style={{ color: "white" }}
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
    </div>
  );
}

export default QuizForm;
