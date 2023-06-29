import Layout from "./../Layout";
import * as React from "react";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Loading from "./loading";

export default function NewQuiz() {
  const [quizName, setQuizName] = React.useState("");
  const [enableDifficultyTags, setEnableDifficultyTags] = React.useState(false);
  const [enablePolls, setEnablePolls] = React.useState(false);
  const [jumpQuestions, setJumpQuestions] = React.useState(false);
  const [timeForAQuestion, setTimeForAQuestion] = React.useState(10);
  const [markForCorrect, setMarkForCorrect] = React.useState(5);
  const [markForIncorrect, setMarkForIncorrect] = React.useState(-1);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const createQuiz = async () => {
    setIsLoading(true);
    const quizData: any = {
      title: quizName,
      difficultyTags: enableDifficultyTags,
      isPolls: enablePolls,
      jumpQuestions: jumpQuestions,
      timeForAQuestion: timeForAQuestion,
      markForCorrect: markForCorrect,
      markForIncorrect: markForIncorrect,
    };

    const res = await fetch("/api/createQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(quizData),
    });
    const { quizId, code } = await res.json();
    setIsLoading(false);
    quizData.quizId = quizId;
    quizData.code = code;
    router.push({ pathname: `/NewQuiz/Questions`, query: quizData });
  };
  if (isLoading) {
    return (
      // @ts-ignore
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Loading />
        </Suspense>
      </Layout>
    );
  }
  return (
    // @ts-ignore
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col max-w-lg">
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">Quiz Name</span>
            </label>
            <input
              type="text"
              placeholder="My awesome quiz"
              className="text-sm m-5 input input-accent input-bordered"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">
                Enable Difficultly Tags{" "}
              </span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-md toggle-accent m-5"
              onChange={(e) => {
                setEnableDifficultyTags(e.target.checked);
              }}
              checked={enableDifficultyTags}
            />
          </div>
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">Enable Polls </span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-md toggle-accent m-5"
              onChange={(e) => {
                setEnablePolls(e.target.checked);
              }}
              checked={enablePolls}
            />
          </div>
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">Jump Questions </span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-md toggle-accent m-5"
              onChange={(e) => {
                setJumpQuestions(e.target.checked);
              }}
              checked={jumpQuestions}
            />
          </div>
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">
                Default time for a question{" "}
              </span>
            </label>
            <input
              type="number"
              placeholder="10"
              className=" m-5 txtin input input-bordered"
              value={timeForAQuestion}
              onChange={(e) => {
                setTimeForAQuestion(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">
                Default marks for correct{" "}
              </span>
            </label>
            <input
              type="number"
              placeholder="5"
              className=" m-5 input txtin input-bordered"
              value={markForCorrect}
              onChange={(e) => {
                setMarkForCorrect(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex justify-between">
            <label className="label m-5">
              <span className=" text-lg label-text">
                Default marks for incorrect{" "}
              </span>
            </label>
            <input
              type="number"
              placeholder="-1"
              className=" m-5 input txtin input-bordered"
              value={markForIncorrect}
              onChange={(e) => {
                setMarkForIncorrect(Number(e.target.value));
              }}
            />
          </div>
        </div>

        {/* random dev stuff.... */}

        <div className="justify-end items-end mr-5 mt-1 flex">
          <button
            className="btn btn-primary w-48 h-20 "
            disabled={!quizName.trim()}
            onClick={createQuiz}
          >
            Start making the quiz !
          </button>
        </div>
      </div>
    </Layout>
  );
}
