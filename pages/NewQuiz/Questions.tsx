import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import DeleteButton from "../components/DeleteButton";
import { useState } from "react";

// Indexing function:
const IndexEntry = ({
  name,
  setActiveQuestion,
  activeQuestion,
  index,
  deleteFunction,
}) => (
  <tr
    className={`flex justify-between select-none ${
      activeQuestion == index + 1 ? "bg-primary-focus" : ""
    }`}
    onClick={() => setActiveQuestion(index + 1)}
  >
    <td>{name}</td>
    <td>
      <DeleteButton onClick={() => deleteFunction(index, setActiveQuestion)} />
    </td>
  </tr>
);

// Function for the poll:
function Option({
  isPoll,
  question,
  setQuestion,
  index,
}: {
  isPoll: boolean;
  question: Question;
  setQuestion: Function;
  index: number;
}) {
  const checkBox = (
    <td className="checkBox">
      <label>
        <input
          type="checkbox"
          className="checkbox"
          checked={question.correctOption === index}
          onChange={(e) => {
            const newQuestion = structuredClone(question);
            if (e.target.checked) {
              newQuestion.correctOption = index;
            } else {
              newQuestion.correctOption = -1;
            }
            setQuestion(newQuestion);
          }}
        />
      </label>
    </td>
  );
  return (
    <tr>
      {!isPoll ? checkBox : null}

      <td className="OptionBox">
        <input
          type="text"
          placeholder="Type option here"
          className="input input-bordered input-primary w-full"
          value={question.options[index] ? question.options[index] : ""}
          onChange={(e) => {
            const newQuestion = structuredClone(question);
            newQuestion.options[index] = e.target.value;
            setQuestion(newQuestion);
          }}
        />
      </td>
    </tr>
  );
}

// function for the difficulty tags:
function DifficultyTags() {
  const [difficulty, setDifficulty] = useState(0);

  return (
    <>
      {/* Divider */}
      <div className="divider"></div>

      <h1 className="text-2xl mb-4">Question Settings:</h1>
      <div>
        {/* Difficulty tag */}
        <div className="flex justify-between m-5">
          <label className="label m-5">
            <span className="txtf label-text">Difficulty </span>
          </label>
          {/* Tried to color the tag: */}
          <div className="join m-5">
            <input
              className={`join-item btn ${
                difficulty === 1 ? "bg-green-500" : ""
              }`}
              type="radio"
              name="options"
              aria-label="Easy"
              onClick={() => setDifficulty(1)}
            />
            <input
              className={`join-item btn ${
                difficulty === 2 ? "bg-yellow-500" : ""
              }`}
              type="radio"
              name="options"
              aria-label="Moderate"
              onClick={() => setDifficulty(2)}
            />
            <input
              className={`join-item btn ${
                difficulty === 3 ? "bg-red-500" : ""
              }`}
              type="radio"
              name="options"
              aria-label="Hard"
              onClick={() => setDifficulty(3)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// type for each question:
type Question = {
  question: string;
  options: string[];
  correctOption: number;
  difficulty?: number;
};

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
    console.log(activeQuestion);
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
              <h1 className="flex text-2xl">Question panel</h1>
                {/* removed the not used add question button */}
            </div>

            {/* Question Panel Table */}
            <table className="table ">
              <thead>
                <tr className="grid grid-cols-3">
                  <th className="justify-self-center">Name</th>
                  <th className="justify-self-end">Action</th>
                </tr>
              </thead>

              <tbody>
                {questions.map((i, n) => (
                  <IndexEntry
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                    name={`Question ${n + 1}`}
                    index={n}
                    key={n}
                    deleteFunction={(index, setActiveQuestion) => {
                      const newQuestions = structuredClone(questions);
                      newQuestions.splice(index + 1, 1);

                      setActiveQuestion(index); // this is not working !! 😭
                      console.log(typeof setActiveQuestion);
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
              <h1 className="text-2xl mb-4">Question:</h1>
              <button
                className="btn mb-4 btn-outline btn-success"
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
              <table className="table">
                <thead>
                  <tr>
                    <th className="checkBox">Correct Options</th>
                    <th className="OptionBox">Options</th>
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
