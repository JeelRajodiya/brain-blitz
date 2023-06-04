import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { uuid } from "uuidv4";
import QuestionsIndexEntry from "../components/QuestionsIndexEntry";
import DifficultyTag from "../components/DifficultyTag";
function getNextQuestionId(questions, id) {
  const givenIndex = questions.findIndex((question) => question.id === id);
  return questions[givenIndex + 1].id || id;
}

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

type Question = {
  question: string;
  options: string[];
  correctOption: number;
  difficulty?: number;
  id: string;
};
const emptyQuestion = () => {
  const newId = uuid();
  console.log(newId, "new");
  return {
    question: "",
    options: [],
    correctOption: 0,
    id: newId,
  };
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

  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>(emptyQuestion());
  const [activeQuestion, setActiveQuestion] = useState("");
  React.useEffect(() => {
    questions.forEach((question) => {
      if (question.id === activeQuestion) {
        setQuestion(question);
      }
    });
  }, [activeQuestion]);
  React.useEffect(() => {
    const newEmptyQuestion = emptyQuestion();
    setQuestion(newEmptyQuestion);
    setQuestions([newEmptyQuestion]);
    setActiveQuestion(newEmptyQuestion.id);
  }, []);
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
              <button className="btn btn-square mb-5 bg-green-500 hover:bg-green-700">
                <h1 className="text-4xl mb-5">+</h1>
              </button>
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
                  <QuestionsIndexEntry
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                    name={`Question ${n + 1}`}
                    id={i.id}
                    key={n}
                    questions={questions}
                    deleteFunction={(index) => {
                      const newQuestions = structuredClone(questions);
                      newQuestions.splice(index, 1);
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
                  if (questions.at(-1).id === question.id) {
                    newQuestions.push(question);
                    setQuestion(emptyQuestion());
                  } else {
                    newQuestions.forEach((q, index) => {
                      if (q.id === question.id) {
                        newQuestions[index] = question;
                      }
                    });
                  }
                  console.log(questions);
                  setActiveQuestion(question.id);
                  setQuestions(newQuestions);
                }}
              >
                Save Question
              </button>
            </div>

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

              {difficultyTags == "true" ? <DifficultyTag /> : ""}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
