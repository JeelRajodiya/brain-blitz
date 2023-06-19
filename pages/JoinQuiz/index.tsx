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
    <div className={classnames(badgeClass, "p-3 ml-5")}>
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

      setIsLoading(false);
    });
  }, [code]);
  useEffect(() => {
    // setInterval(() => setTimer((t) => t - 1));
  }, [timeForAQuestion]);

  React.useEffect(() => {
    setQuestion(questions[activeQuestion - 1] || emptyQuestion);
    setTimer(timeForAQuestion);
    console.log(activeQuestion);
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

  const nextQuestion = () => {
    if (activeQuestion < totalQuestions) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

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
              <div
                className="radial-progress ml-3"
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

              {/* question number */}
              <div>
                <h1 className="text-lg font-bold bg-base-100 p-2 rounded-md">
                  Question {activeQuestion}
                </h1>
              </div>

              {/* timer */}
              <div className="grid grid-flow-col bg-base-100 rounded-xl p-2 gap-2 text-center">
                <div className="flex justify-center items-center h-full">
                  <div className="text-lg">{timeForAQuestion}</div>
                  <p>s</p>
                </div>
              </div>
            </div>

            {/* question body: */}
            <div className="navbar w-full rounded-lg m-1 bg-neutral flex flex-column">
              <p className="p-2 text-lg font-semibold">{question?.question}</p>
              {/* Difficulty tag if it is enabled */}
              {difficultyTags && (
                <DifficultyTag difficulty={question.difficulty} />
              )}
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
