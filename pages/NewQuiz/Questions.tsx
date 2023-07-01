import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Questions.module.css";
import classnames from "classnames";
import DifficultyTags from "../components/DifficultyTagSelector";
import QuestionsIndexEntry from "../components/QuestionsIndexEntry";
import type { QuestionCol } from "../../util/DB";
import Option from "../components/CreateQuizOption";
import { CreateQuizQuestion, Difficulty } from "../../util/types";

// type for each question:
async function postQuestions(
  questions: CreateQuizQuestion[],
  quizId: string,
  router: any,
  code: string
) {
  questions.map((q) => {
    q.quizId = quizId;
  });
  questions = questions.filter((q) => q.question !== "");
  //   console.log(questions);
  const res = fetch("/api/createQuestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questions),
  });
  res.then((res) => {
    if (res.status != 200) {
      alert("Error in creating quiz");
      return;
    }
    router.push({
      pathname: "/NewQuiz/QuizCode",
      query: {
        code,
      },
    });
  });
}

function showWarning(
  question: CreateQuizQuestion,

  setMsg: Function
) {
  const optionsSet = new Set(question.options);
  const emptyOptions = question.options.filter((s) => s.trim() === "");
  if (question.question.trim() === "") {
    setMsg("Can not leave question empty");
    return true;
  } else if (emptyOptions.length !== 0) {
    setMsg("Can not leave any option empty");
    return true;
  } else if (optionsSet.size !== question.options.length) {
    setMsg("You can not have duplicate options ");
    return true;
  } else if (question.correctOption === null) {
    setMsg("Please select a correct option");
    return true;
  }

  return false;
}

export default function Questions() {
  const router = useRouter();

  const {
    title,
    difficultyTags,

    jumpQuestions,
    timeForAQuestion,
    markForCorrect,
    markForIncorrect,
    quizId,
    code,
  } = router.query;

  const emptyQuestion: CreateQuizQuestion = {
    question: "",
    options: ["", "", "", ""], //! haivng 4 options by default
    correctOption: null,
    difficulty: "Medium",
    quizId: "",
  };

  const [questions, setQuestions] = useState<CreateQuizQuestion[]>([
    emptyQuestion,
  ]);
  const [question, setQuestion] = useState<CreateQuizQuestion>(emptyQuestion);
  const [activeQuestion, setActiveQuestion] = useState(1);

  React.useEffect(() => {
    setQuestion(questions[activeQuestion] || emptyQuestion);
  }, [activeQuestion]);

  const [msg, setMsg] = useState("");
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  // for message to be shown when the warning button is clicked

  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        {/* <h1 className="mb-5">{iden}</h1> */}

        <div className={classnames("flex w-full", styles.questionForm)}>
          {/* Question Panel Div */}
          <div className="w-2/5">
            <div className="flex flex-row mt-4 justify-between">
              <h1
                className={classnames("flex ml-2 text-2xl", styles.mobileFonts)}
              >
                Question panel
              </h1>
              {/* removed the not used add question button */}
            </div>

            {/* Question Panel Table */}
            <div className="table mt-4">
              {questions.map((i, n) => (
                <QuestionsIndexEntry
                  activeQuestion={activeQuestion}
                  setActiveQuestion={setActiveQuestion}
                  name={`Question ${n + 1}`}
                  index={n}
                  key={n}
                  deleteFunction={(
                    index: number,
                    setActiveQuestion: Function
                  ) => {
                    const newQuestions = structuredClone(questions);
                    let newQuestion = structuredClone(question);
                    newQuestions.splice(index + 1, 1);

                    newQuestion = newQuestions[index];
                    setActiveQuestion(index !== 0 ? index : 1);
                    setQuestions(newQuestions);
                  }}
                />
              ))}
            </div>
            <button
              className={classnames(
                `btn btn-success mt-4 mb-4 btn-wide w-full text-center`,
                styles.darken
              )}
              onClick={() => {
                postQuestions(
                  questions,
                  quizId as string,
                  router,
                  code as string
                );
              }}
              disabled={questions.length - 1 == 0}
            >
              Save Quiz
            </button>
          </div>

          <div className="divider divider-horizontal"></div>
          {/* Question Form Div */}
          <div className="w-3/5">
            <div className="flex flex-row justify-between items-center">
              <h1 className={classnames("text-2xl mb-4", styles.mobileFonts)}>
                Question: {activeQuestion}
              </h1>

              {/* the different action buttons save question and warning */}

              <button
                className="btn mb-4 btn-outline btn-success btn-sm"
                onClick={() => {
                  if (!showWarning(question, setMsg)) {
                    const newQuestions = structuredClone(questions);
                    if (activeQuestion == questions.length) {
                      newQuestions.push(question);
                    } else {
                      newQuestions[activeQuestion] = question;
                    }
                    setActiveQuestion((e) => e + 1);
                    setQuestions(newQuestions);
                    setQuestion(emptyQuestion);
                  } else {
                    setIsWarningVisible(true);
                    setTimeout(() => setIsWarningVisible(false), 1500);
                  }
                }}
              >
                Save Question
              </button>
            </div>

            {/* Write the main question:  */}
            <div>
              <input
                placeholder="Who is the president of UK?"
                className="input input-bordered w-full resize-y max-h-36 m-1"
                value={question.question}
                onChange={(e) => {
                  const newQuestion = structuredClone(question);
                  newQuestion.question = e.target.value;

                  setQuestion(newQuestion);
                }}
              ></input>
            </div>

            {/* MCQ details table */}
            <div className="overflow-x-auto">
              <table className="table break-all w-full ">
                <tbody>
                  {[1, 2, 3, 4].map((i) => {
                    return (
                      <Option
                        key={i}
                        index={i - 1}
                        question={question}
                        setQuestion={setQuestion}
                      />
                    );
                  })}
                </tbody>
              </table>

              {difficultyTags == "true" ? (
                <DifficultyTags
                  difficulty={question.difficulty as Difficulty}
                  setDifficulty={(d: Difficulty) => {
                    const newQuestion = structuredClone(question);
                    newQuestion.difficulty = d;
                    setQuestion(newQuestion);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* Warning message to be shown when the warning button is clicked */}

        <div
          className={classnames(
            "toast toast-end ",
            styles.warningMsg,
            isWarningVisible && styles.visibleWarning
          )}
        >
          <div className="alert alert-warning">{msg}</div>
        </div>
      </Layout>
    </>
  );
}
