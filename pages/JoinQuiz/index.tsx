import * as React from "react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./JoinQuiz.module.css";
import classnames from "classnames";
import DifficultyTags from "../components/DifficultyTags";
import QuestionsIndexEntry from "../components/QuestionsIndexEntry";
import type { Question } from "../components/Option";
import Option from "../components/Option";

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
  const [ShowSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!code) return;
    fetchQuiz(code as string).then((res) => {
      console.log(res);
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
    setQuestion(questions[activeQuestion] || emptyQuestion);
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

  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        {/* sidebar if enabled */}
        <div className={styles.wrapper}>
          {jumpQuestions && <div className={styles.sideBar}>Side Bar</div>}

          {/* main window */}
          {/* progress bar here */}
          <div className={styles.mainWindow}>
            <div className="navbar rounded-lg m-1 bg-neutral flex-row justify-between">
              <div
                className="radial-progress"
                style={
                  {
                    "--value": "70",
                    "--size": "5rem",
                    "--thickness": "5px",
                  } as React.CSSProperties
                }
              >
                70%
              </div>

              <div>{/* Question number will go here */}</div>

              {/* timer */}
              <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
                {/* hours */}
                <div className="flex bg-base-100 flex-col p-2 rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    <span
                      style={{ "--value": 0 } as React.CSSProperties}
                    ></span>
                  </span>
                  hours
                </div>
                {/* minutes */}
                <div className="flex bg-base-100 flex-col p-2 rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    <span
                      style={{ "--value": 24 } as React.CSSProperties}
                    ></span>
                  </span>
                  min
                </div>
                {/* seconds */}
                <div className="flex bg-base-100 flex-col p-2 rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    <span
                      style={{ "--value": 41 } as React.CSSProperties}
                    ></span>
                  </span>
                  sec
                </div>
              </div>
            </div>

            {/* question body: */}
            <div className="navbar rounded-lg m-1 bg-neutral">
              <p>{/* put question content here */}</p>
              {/* Question content will go here */}
              <p className="p-2 text-lg">{question.question}</p>
              {/* Difficulty tag if it is enabled */}
              {difficultyTags && (
                <div className="badge badge-outline">Easy</div>
              )}
            </div>

            <div className="divider"></div>
            {/* options here: */}
            <div className="styles.options"></div>
            <div className="navbar rounded-lg m-1 bg-neutral">{/*  */}</div>
          </div>
        </div>
      </Layout>
    </>
  );
}
