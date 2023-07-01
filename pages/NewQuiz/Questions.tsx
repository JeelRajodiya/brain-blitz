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

export default function Questions() {
  const router = useRouter();

  const {
    title,
    difficultyTags,
    isPolls,
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

  // for individual question to account all entries filled or not
  function allEntriesFilled() {
    if (
      question.question.trim() === "" ||
      question.options.length === 0 ||
      question.correctOption === null
    ) {
      return false;
    }

    for (let i = 0; i < question.options.length; i++) {
      if (question.options[i].trim() === "") {
        return false;
      }
    }

    const optionsSet = new Set(question.options);
    if (optionsSet.size !== question.options.length) {
      return false;
    }

    setShowWarning(false);
    return true;
  }

  const [showWarning, setShowWarning] = useState(false);
  const [messageWarning, setMessageWarning] = useState<string>();

  // for message to be shown when the warning button is clicked
  function warningMessage() {
    let message: string = "";

    if (question.question.trim() === "") {
      message = "Question cannot be empty";
    } else if (question.options.length === 0) {
      message = "All options need to be filled";
    } else if (question.correctOption === null) {
      message = "Correct option cannot be empty";
    } else {
      for (let i = 0; i < question.options.length; i++) {
        if (question.options[i].trim() === "") {
          message = "Options cannot be empty";
          break;
        }
      }

      const optionsSet = new Set(question.options);
      if (optionsSet.size !== question.options.length) {
        message = "Options cannot be repeated";
      }
    }

    // set messageWarning state
    setMessageWarning(message);
  }

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

              {allEntriesFilled() ? (
                <button
                  className="btn mb-4 btn-outline btn-success btn-sm"
                  onClick={() => {
                    const newQuestions = structuredClone(questions);
                    if (activeQuestion == questions.length) {
                      newQuestions.push(question);
                    } else {
                      newQuestions[activeQuestion] = question;
                    }
                    setActiveQuestion((e) => e + 1);
                    setQuestions(newQuestions);
                    setQuestion(emptyQuestion);
                  }}
                >
                  Save Question
                </button>
              ) : (
                <button
                  className="btn mb-4 btn-outline btn-warning btn-sm"
                  // show the warning message when the warning button is clicked
                  onClick={() => {
                    setShowWarning(!showWarning);
                    warningMessage();
                  }}
                >
                  Warning!
                </button>
              )}
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
                        isPoll={isPolls == "true" ? true : false}
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
        {showWarning && (
          <div className="toast toast-end">
            <div className="alert alert-warning">{messageWarning}</div>
          </div>
        )}
      </Layout>
    </>
  );
}
