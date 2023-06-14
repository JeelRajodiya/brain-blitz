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

  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        <div className="flex mt-50">
          {/* ------------------drawer:------------------ */}
          <div className="drawer">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          {/* ---------------------------------------- */}
          <div>Question Area</div>
        </div>
      </Layout>
    </>
  );
}
