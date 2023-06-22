// Function for the poll:

import * as React from "react";
export type Question = {
  question: string;
  options: string[];
  correctOption: 0 | 1 | 2 | 3;
  difficulty?: 0 | 1 | 2 | 3;
  quizId?: string;
  id?: string;
};

export default function Option({
  isPoll,
  question,
  setQuestion,
  index,
}: {
  isPoll: boolean;
  question: Question;
  setQuestion: Function;
  index: 0 | 1 | 2 | 3;
}) {
  const aToI = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  const checkBox = (
    <td className="checkBox ">
      <label>
        <input
          type="checkbox"
          className="checkbox "
          checked={question?.correctOption === index}
          onChange={(e) => {
            console.log(index);
            const newQuestion = structuredClone(question);
            if (e.target.checked) {
              newQuestion.correctOption = index;
            } else {
              newQuestion.correctOption = 0;
            }
            setQuestion(newQuestion);
          }}
        />
      </label>
    </td>
  );
  return (
    <tr className="flex justify-center items-center">
      {!isPoll ? checkBox : null}

      <td className="OptionBox w-full">
        <input
          type="text"
          placeholder={aToI[index]}
          className="input  w-full"
          value={question?.options[index] ? question.options[index] : ""}
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
