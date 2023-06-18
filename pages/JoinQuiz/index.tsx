import * as React from "react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./JoinQuiz.module.css";
import classnames from "classnames";
import DifficultyTags from "../components/DifficultyTags";
import QuestionsIndexEntry from "../components/QuestionsIndexEntry";
import type { Question } from "../components/Option";
import classNames from "classnames";

// type for each question:
async function fetchQuiz(code: string) {
  const res = await fetch(`/api/joinQuiz?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
}

function Option({
  text,
  isSelected,
  index,
  setQuestion,
}: {
  text: string;
  isSelected: boolean;
  index: number;
  setQuestion: React.Dispatch<React.SetStateAction<Question>>;
}) {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div
      className={classnames(styles.option, isSelected && styles.selectedOption)}
      onClick={() => {
        setQuestion((prev) => {
          const newQue = structuredClone(prev);
          newQue.correctOption = index;
          return newQue;
        });
      }}
    >
      {alphabets[index]}
      <div className="divider divider-horizontal"></div>
      {text}
    </div>
  );
}

export default function Questions() {
  const router = useRouter();

  const { code } = router.query;

  const emptyQuestion = {
    question: "",
    options: [],
    correctOption: 0,
  };

  const [questions, setQuestions] = useState<Question[]>([emptyQuestion]);
  const [question, setQuestion] = useState<Question>(emptyQuestion);
  const [activeQuestion, setActiveQuestion] = useState(1);

  const [isPolls, setIsPolls] = useState(false);
  const [difficultyTags, setDifficultyTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jumpQuestions, setJumpQuestions] = useState(false);
  const [ShowSidebar, setShowSidebar] = useState(jumpQuestions);

  useEffect(() => {
    if (!code) return;
    fetchQuiz(code as string).then((res) => {
      setQuestions(res.questions);
      setQuestion(res.questions[0]);
      setActiveQuestion(1);
      setIsPolls(res.isPolls);
      setDifficultyTags(res.difficultyTags);
      setJumpQuestions(res.jumpQuestions);
      setIsLoading(false);
    });
  }, [code]);

  React.useEffect(() => {
    setQuestion(questions[activeQuestion - 1] || emptyQuestion);
    console.log(questions);
    console.log(question);
  }, [activeQuestion]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-slate-100 "></span>
      </div>
    );
  }

  const toggleSidebar = () => {
    setShowSidebar(!ShowSidebar);
  };

  // total questions is given by questions.length
  let totalQuestions: number = questions.length;
  let complete: number = activeQuestion / totalQuestions;
  complete *= 100;
  complete = Math.round(complete);

  // const nextQuestion = () => {
  //   if (activeQuestion < totalQuestions) {
  //     setActiveQuestion(activeQuestion + 1);
  //   }
  // };

  // const prevQuestion = () => {
  //   if (activeQuestion > 1) {
  //     setActiveQuestion(activeQuestion - 1);
  //   }
  // };

  // ! This temporarily fixed the error but it still does not work

  const questionsBoxes = [];
  for (let i = 0; i < questions.length; i++) {
    if (i == activeQuestion - 1) {
      questionsBoxes.push(
        <div
          key={i}
          className={classnames(styles.questionBoxActive, styles.questionBox)}
        >
          {i + 1}
        </div>
      );
      continue;
    }
    questionsBoxes.push(
      <div
        className={styles.questionBox}
        onClick={() => {
          setActiveQuestion(i + 1);
        }}
        key={i}
      >
        {i + 1}
      </div>
    );
  }

  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        {/* sidebar if enabled */}
        <div className={styles.wrapper}>
          <div
            className={classnames(
              styles.sideBar,
              ShowSidebar && styles.showSideBar
            )}
          >
            {questionsBoxes}
          </div>

          {/* main window */}
          {/* progress bar here */}
          <div className={styles.mainWindow}>
            <div className="navbar rounded-lg m-1 bg-neutral flex flex-row items-center justify-between w-full">
              <div
                className="radial-progress"
                style={
                  {
                    "--value": `${complete}`,
                    "--size": "3rem",
                    "--thickness": "4px",
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onClick={toggleSidebar}
              >
                <p className="text-xs">{complete}%</p>
              </div>

              <div>
                <h1 className="text font-bold bg-base-100 p-2 rounded-md">
                  Question {activeQuestion}
                </h1>
              </div>

              {/* timer */}
              <div className="grid grid-flow-col gap-2 text-center">
                {/* minutes */}

                {/* seconds */}
                <div className="flex bg-base-100 flex-col text-md p-2 rounded-box text-neutral-content">
                  <span className="countdown font-mono ">
                    <span
                      style={{ "--value": 99 } as React.CSSProperties}
                    ></span>
                  </span>
                  sec
                </div>
              </div>
            </div>

            {/* question body: */}
            <div className="navbar w-full rounded-lg m-1 bg-neutral flex flex-column justify-between">
              <div className="flex justify-start">
                <p className="p-2 text-lg font-semibold">
                  {question?.question}
                </p>
              </div>
              <div className="flex justify-end items-end p-2">
                {/* Difficulty tag if it is enabled */}
                {difficultyTags && (
                  <div className="badge badge-outline">Very Hard</div>
                )}
              </div>
            </div>

            <div className="divider"></div>
            {/* options here: */}
            <div className={styles.optionsWrapper}>
              {question?.options.map((option, index) => {
                console.log(option);
                return (
                  <Option
                    key={index}
                    text={option}
                    index={index}
                    isSelected={index === question.correctOption}
                    setQuestion={setQuestion}
                  />
                );
              })}
            </div>

            <div className="navbar rounded-lg m-1 bg-neutral flex flex-row">
              <div className="flex">
                <button
                  className={classNames(
                    `btn btn-outline btn-accent`,
                    styles.wrap
                  )}
                >
                  Save and Next
                </button>

                <button
                  className={classNames(
                    `btn btn-outline btn-accent`,
                    styles.wrap
                  )}
                >
                  Skip and Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
