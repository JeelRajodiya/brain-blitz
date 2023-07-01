// Function for the poll:

import * as React from "react";
import { QuestionCol } from "../../util/DB";
import { CreateQuizQuestion, QuestionOption } from "../../util/types";
import { ItoA } from "../../util/types";
export default function Option({
  question,
  setQuestion,
  index,
}: {
  question: CreateQuizQuestion;
  setQuestion: Function;
  index: number;
}) {
  const checkBox = (
    <td className="checkBox ">
      <label>
        <input
          type="checkbox"
          className="checkbox "
          checked={question?.correctOption === ItoA[index]}
          onChange={(e) => {
            console.log(index);
            const newQuestion = structuredClone(question);
            if (e.target.checked) {
              newQuestion.correctOption = ItoA[index];
            } else {
              newQuestion.correctOption = null;
            }
            setQuestion(newQuestion);
          }}
        />
      </label>
    </td>
  );
  return (
    <tr className="flex justify-center items-center">
      {checkBox}

      <td className="OptionBox w-full">
        <input
          type="text"
          placeholder={ItoA[index]}
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
