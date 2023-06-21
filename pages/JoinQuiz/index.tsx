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
import { QuestionCol, QuizCol } from "../../util/DB";
import { text } from "stream/consumers";

// type for each question:
async function fetchQuiz(code: string) {
  type Res = QuizCol & {
    questions: QuestionCol[];
  };
  const res = await fetch(`/api/joinQuiz?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json: Res = await res.json();
  return json;
}
function secondsToMandS(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  return { minutes, secondsLeft };
}

// Option component:
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
          if (newQue.correctOption == index) {
            newQue.correctOption = -1;
          } else {
            newQue.correctOption = index;
          }
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

// difficulty tag:
function DifficultyTag({ difficulty }: { difficulty: number }) {
  const difficultyTags = ["Easy", "Medium", "Hard"];
  let badgeClass;
  if (difficulty == 1) {
    badgeClass = "badge badge-success";
  } else if (difficulty == 2) {
    badgeClass = "badge badge-warning";
  } else {
    badgeClass = "badge badge-error";
  }
  return (
    <div className={classnames(badgeClass, "p-3 m-1")}>
      {difficultyTags[difficulty - 1]}
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
  const [difficultyTags, setDifficultyTags] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jumpQuestions, setJumpQuestions] = useState(false);
  const [ShowSidebar, setShowSidebar] = useState(jumpQuestions);
  const [timeForAQuestion, setTimeForAQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  let timeInterval: NodeJS.Timer;
  let { minutes, secondsLeft } = secondsToMandS(timer);

  // make a state of list of maps to store responses
  interface ansSheet {
    questionId: string;
    selectedOption: number;
  }

  // accounting for the option selected:
  const [currentOption, setCurrentOption] = useState<number>(0);
  const handleOption = (ans: number) => {
    setCurrentOption(ans);
  };

  // the options backend goes here:
  const [answerSheet, setAnswerSheet] = useState<ansSheet[]>([]);

  const handleSave = () => {
    let reply = currentOption;
    let currQuestion = question;
  };


  useEffect(() => {
    if (!code) return;
    fetchQuiz(code as string).then((res) => {
      setQuestions(res.questions);
      setQuestion(res.questions[0]);
      setActiveQuestion(1);
      setIsPolls(res.isPoll);
      setDifficultyTags(res.difficultyTags);
      setJumpQuestions(res.jumpQuestions);

      setTimeForAQuestion(res.timeForAQuestion);
      setTimer(res.timeForAQuestion);

      setIsLoading(false);
    });
  }, [code]);
  useEffect(() => {
    timeInterval = setInterval(() => setTimer((t) => t - 1), 1000);
  }, [timeForAQuestion]);

  React.useEffect(() => {
    setQuestion(questions[activeQuestion - 1] || emptyQuestion);
    setTimer(timeForAQuestion);
    console.log(activeQuestion);
    clearInterval(timeInterval);
  }, [activeQuestion]);
  useEffect(() => {
    if (timer == 0) {
      nextQuestion();
    }
  }, [timer]);
  const nextQuestion = () => {
    if (activeQuestion < totalQuestions) {
      setActiveQuestion(activeQuestion + 1);
    }
  };
  const toggleSidebar = () => {
    setShowSidebar(!ShowSidebar);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-slate-100 "></span>
      </div>
    );
  }

  // total questions is given by questions.length
  let totalQuestions: number = questions.length;
  let complete: number = activeQuestion / totalQuestions;
  complete *= 100;
  complete = Math.round(complete);

  // radial progress:
  function RadialProgress({ complete }: { complete: number }) {
    let textColor: string;
    if (complete < 25) {
      textColor = "text-red-500";
    } else if (complete < 50) {
      textColor = "text-yellow-500";
    } else if (complete < 75) {
      textColor = "text-green-500";
    } else if (complete < 100) {
      textColor = "text-primary";
    } else {
      textColor = "text-accent";
    }

    return (
      <div
        className={`radial-progress ml-3 ${textColor}`}
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
        <p className="text-xs tooltip tooltip-info tooltip-right" data-tip = {complete+"% attempted"} >{complete}%</p>
      </div>
    );
  }

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

  let isLastQuestion: boolean = activeQuestion == totalQuestions;

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
            {/* toggle to show Sidebar: */}
            <div
              onClick={toggleSidebar}
              className={classnames(
                styles.drawerBtn,
                ShowSidebar && styles.drawerBtnOpen
              )}
            >
              <p>{">"}</p>
            </div>

            {/* progress bar*/}
            <div className="navbar rounded-lg m-1 bg-neutral flex flex-row items-center justify-between w-full">
              <RadialProgress complete={complete} />

              {/* question number */}
              <div>
                <h1 className="text-lg font-bold bg-base-100 p-2 rounded-md">
                  Question {activeQuestion}
                </h1>
              </div>

              {/* timer */}
              <div className="grid grid-flow-col bg-base-100 rounded-xl p-2 gap-2 text-center">
                <span className="countdown font-mono text-2xl">
                  <span
                    style={{ "--value": minutes } as React.CSSProperties}
                  ></span>
                  m
                  <span
                    style={{ "--value": secondsLeft } as React.CSSProperties}
                  ></span>
                  s
                </span>
              </div>
            </div>

            {/* question body: */}
            <div
              className={classNames(
                `navbar w-full rounded-lg m-1 bg-neutral `,
                styles.questionContent
              )}
            >
              <div>
                <p className="p-2 text-lg font-semibold">
                  {question?.question}
                </p>
              </div>

              {/* Difficulty tag if it is enabled */}
              <div>
                {difficultyTags && (
                  <DifficultyTag difficulty={question.difficulty} />
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

            <div
              className={classNames(
                `navbar rounded-lg m-1`,
                styles.quizActions
              )}
            >
              <button
                className="btn btn-accent btn-outline"
                onClick={nextQuestion}
              >
                {isLastQuestion ? "Save and Submit" : "Save and Next"}
              </button>
              <button
                className="btn btn-accent btn-outline"
                onClick={nextQuestion}
              >
                {isLastQuestion ? "Skip and Submit" : "Skip and Next"}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
