import { useDispatch } from "react-redux";
import * as React from "react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./JoinQuiz.module.css";
import classnames from "classnames";
import {
  Difficulty,
  ItoA,
  JoinQuizResponse,
  SelectedOption,
} from "../../util/types";
import classNames from "classnames";
import { JoinQuizQuestion, AnswerSheet } from "../../util/types";
import {
  secondsToMandS,
  fetchQuiz,
  submitResponse,
} from "../../util/functions";
import RadicalProgress from "../components/RadicalProgress";
import JoinQuizOption from "../components/JoinQuizOption";
import DifficultyTagViewer from "../components/DifficultyTagViewer";
import QuestionBoxes from "../components/QuestionBoxes";
import Timer from "../components/Timer";
import { store } from "../../util/store";
import { updateResult } from "../../util/slices/resultSlice";
export default function Questions() {
  const router = useRouter();
  let code: string = router.query.code as string;

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
  const [markForCorrect, setMarkForCorrect] = useState(1);
  const dispatch = useDispatch();

  // make a state of list of maps to store responses

  // the options backend goes here:
  const [answerSheet, setAnswerSheet] = useState<AnswerSheet>({});

  useEffect(() => {
    if (!code) return;
    fetchQuiz(code as string).then((res) => {
      setQuestions(res.questions);
      setAnswerSheet((prev) => {
        const newAnswerSheet = structuredClone(prev);
        res.questions.forEach((q) => {
          newAnswerSheet[q.id] = null;
        });
        return newAnswerSheet;
      });
      setQuestion(res.questions[0]);
      setActiveQuestion(1);
      setIsPolls(res.isPoll);
      setDifficultyTags(res.difficultyTags);
      setJumpQuestions(res.jumpQuestions);

      setTimeForAQuestion(res.timeForAQuestion);
      setTimer(res.timeForAQuestion);
      setMarkForCorrect(res.markForCorrect);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitQuiz() {
    // submit the quiz
    setIsSubmitting(true);
    let dataToSend: JoinQuizResponse = {
      code: code,
      responses: answerSheet,
    };
    const quizResult = await submitResponse(dataToSend);
    console.log(quizResult);
    dispatch(updateResult(quizResult));
    setIsSubmitting(false);
    router.push({
      pathname: "/JoinQuiz/QuizResult",
    });
  }
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
            {
              <QuestionBoxes
                activeQuestion={activeQuestion}
                numberOfQuestions={questions.length}
                setActiveQuestion={setActiveQuestion}
              />
            }
          </div>

          {/* main window */}

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
              <RadicalProgress
                complete={complete}
                toggleSidebar={toggleSidebar}
              />

              {/* question number */}
              <div>
                <h1 className="text-lg font-bold bg-base-100 p-2 rounded-md">
                  Question {activeQuestion}
                </h1>
              </div>

              <Timer minutes={minutes} secondsLeft={secondsLeft} />
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
                  <DifficultyTagViewer
                    difficulty={question.difficulty as Difficulty}
                  />
                )}
              </div>
            </div>

            <div className="divider"></div>

            {/* options here: */}
            <div className={styles.optionsWrapper}>
              {question?.options.map((option, index) => {
                //  Critical bug here: Options is re rendered on every state change
                // console.log(option);
                return (
                  <JoinQuizOption
                    key={index}
                    text={option}
                    index={index}
                    isSelected={ItoA[index] === answerSheet[question.id]}
                    setAnswerSheet={setAnswerSheet}
                    questionId={question.id}
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
              {isLastQuestion ? (
                <button
                  className="btn btn-error btn-outline"
                  onClick={submitQuiz}
                >
                  Final Submit
                </button>
              ) : (
                <button
                  className="btn btn-accent btn-outline"
                  onClick={nextQuestion}
                >
                  {" "}
                  Save and Next
                </button>
              )}
            </div>
            {isSubmitting && (
              <div
                className={classnames(
                  "alert alert-warning",
                  styles.submittingToast
                )}
              >
                <span>Submitting ... </span>
                <span className="loading loading-infinity loading-md"></span>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
