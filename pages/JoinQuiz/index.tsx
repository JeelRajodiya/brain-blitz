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

  //! PROBLEM: the drawer is not fitting properly

  const toggleSidebar = () => {
    setShowSidebar(!ShowSidebar);
  };
  const questionsBoxes = [];
  for (let i = 0; i < questions.length; i++) {
    if (i == activeQuestion - 1) {
      questionsBoxes.push(
        <div
          className={classnames(styles.questionBoxActive, styles.questionBox)}
        >
          {i + 1}
        </div>
      );
      continue;
    }
    questionsBoxes.push(<div className={styles.questionBox}>{i + 1}</div>);
  }

  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        <div className={styles.wrapper}>
          <div className={styles.sideBar}>{questionsBoxes}</div>
          <div className={styles.mainWindow}>Main window</div>
        </div>
      </Layout>
    </>
  );
}
