import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import DeleteButton from "../components/DeleteButton";
import { useState, useEffect } from "react";
import styles from "./Questions.module.css";
import classnames from "classnames";
import DifficultyTags from "../components/DifficultyTags";
import QuestionsIndexEntry from "../components/QuestionsIndexEntry";
import type { Question } from "../components/Option";
import Option from "../components/Option";
// type for each question:

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
  } = router.query;

  const emptyQuestion = {
    question: "",
    options: [],
    correctOption: 0,
  };

  const [questions, setQuestions] = useState<Question[]>([emptyQuestion]);
  const [question, setQuestion] = useState<Question>(emptyQuestion);
  const [activeQuestion, setActiveQuestion] = useState(1);

  React.useEffect(() => {
    setQuestion(questions[activeQuestion] || emptyQuestion);
  }, [activeQuestion]);

  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        {/* <h1 className="mb-5">{iden}</h1> */}

        <div className="flex w-full questionForm">
          {/* Question Panel Div */}
          <div className="w-2/5">
            <div className="flex flex-row mt-4 justify-between">
              <h1 className={classnames("flex text-2xl", styles.mobileFonts)}>
                Question panel
              </h1>
              {/* removed the not used add question button */}
            </div>

            {/* Question Panel Table */}
            <table className="table ">
              <thead>
                <tr className="grid grid-cols-2">
                  <th className="justify-self-start ">Name</th>
                  <th className="justify-self-end">Action</th>
                </tr>
              </thead>

              <tbody>
                {questions.map((i, n) => (
                  <QuestionsIndexEntry
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                    name={`Question ${n + 1}`}
                    index={n}
                    key={n}
                    deleteFunction={(index, setActiveQuestion) => {
                      const newQuestions = structuredClone(questions);
                      let newQuestion = structuredClone(question);
                      newQuestions.splice(index + 1, 1);

                      newQuestion = newQuestions[index];
                      setActiveQuestion(index !== 0 ? index : 1);
                      //   setQuestion(newQuestion);
                      setQuestions(newQuestions);
                    }}
                  />
                ))}
              </tbody>
            </table>
            <button className="btn btn-success mt-4 mb-4 w-full btn-wide text-center">
              Save Quiz
            </button>
          </div>

          {/* Add a verticle divider here: it does not work */}
          <div className="divider divider-horizontal"></div>
          {/* Question Form Div */}
          <div className="w-3/5">
            <div className="flex flex-row justify-between items-center">
              <h1 className={classnames("text-2xl mb-4", styles.mobileFonts)}>
                Question: {activeQuestion}
              </h1>
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
            </div>

            {/* Write the main question:  */}
            <div>
              <input
                placeholder="Who is the president of UK?"
                className="input input-bordered input-primary w-full resize-y max-h-36"
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
                <thead>
                  <tr>
                    <th
                      className={classnames(
                        "whitespace-nowrap max-w-xs min-w-0 break-words truncate",
                        styles.heading
                      )}
                    >
                      Correct Option
                    </th>
                    {!isPolls && <th className="OptionBox">Options</th>}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => {
                    return (
                      <Option
                        key={i}
                        index={i}
                        question={question}
                        setQuestion={setQuestion}
                        isPoll={isPolls == "true" ? true : false}
                      />
                    );
                  })}
                </tbody>
              </table>

              {difficultyTags == "true" ? <DifficultyTags /> : ""}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
