import * as React from "react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./JoinQuiz.module.css";
import classnames from "classnames";
import { Difficulty, ItoA } from "../../util/types";
import classNames from "classnames";
import { QuizCol } from "../../util/DB";
import { JoinQuizQuestion } from "../../util/types";
// type for each question:
async function fetchQuiz(code: string) {
  type Res = QuizCol & {
    questions: JoinQuizQuestion[];
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
  setQuestion: React.Dispatch<React.SetStateAction<JoinQuizQuestion>>;
}) {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div
      className={classnames(styles.option, isSelected && styles.selectedOption)}
      onClick={() => {
        setQuestion((prev) => {
          const newQue = structuredClone(prev);
          if (newQue.correctOption == ItoA[index]) {
            newQue.correctOption = null;
          } else {
            newQue.correctOption = ItoA[index];
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
function DifficultyTag({ difficulty }: { difficulty: Difficulty }) {
  const difficultyTags = ["Easy", "Medium", "Hard"];
  let badgeClass;
  if (difficulty == "Easy") {
    badgeClass = "badge badge-success";
  } else if (difficulty == "Medium") {
    badgeClass = "badge badge-warning";
  } else if (difficulty == "Hard") {
    badgeClass = "badge badge-error";
  } else {
    throw new Error(
      `Expected a difficulty in only "Easy", "Medium", "Hard" got ${difficulty}`
    );
  }
  return <div className={classnames(badgeClass, "p-3 m-1")}>{difficulty}</div>;
}

export default function Questions() {
  const router = useRouter();
  const { code } = router.query;

  const emptyQuestion = {
    question: "",
    id: "",
    options: [],
    correctOption: null,
  } as JoinQuizQuestion;

  const [questions, setQuestions] = useState<JoinQuizQuestion[]>([
    emptyQuestion,
  ]);
  const [question, setQuestion] = useState<JoinQuizQuestion>(emptyQuestion);
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

  // the options backend goes here:
  const [answerSheet, setAnswerSheet] = useState<ansSheet[]>([]);

  const handleSaveAndNext = () => {
    let reply = currentOption;
    let currQuestion = question.id as string;

    // structured clone of answerSheet
    let newAnswerSheet = structuredClone(answerSheet);

    // find the index of the current question in answerSheet
    let index = newAnswerSheet.findIndex(
      (item) => item.questionId === currQuestion
    );

    if (index !== -1) {
      // if the current question is already answered, update the selected option
      newAnswerSheet[index] = {
        questionId: currQuestion,
        selectedOption: reply,
      };
    } else {
      // if the current question is not answered, add a new entry to answerSheet
      newAnswerSheet.push({ questionId: currQuestion, selectedOption: reply });
    }

    // update the answerSheet state
    setAnswerSheet(newAnswerSheet);
    nextQuestion();

    console.log(answerSheet);
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
        <p
          className="text-xs tooltip tooltip-info tooltip-right"
          data-tip={complete + "% attempted"}
        >
          {complete}%
        </p>
      </div>
    );
  }

  const questionsBoxes: React.ReactNode[] = [];
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
                  <DifficultyTag
                    difficulty={question.difficulty as Difficulty}
                  />
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
                    isSelected={ ItoA[index] === question.correctOption}
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
                onClick={handleSaveAndNext}
              >
                {isLastQuestion ? "Save and Submit" : "Save and Next"}
              </button>
              {/* <button
                className="btn btn-accent btn-outline"
                onClick={handleSkipAndNext}
              >
                {isLastQuestion ? "Skip and Submit" : "Skip and Next"}
              </button> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
