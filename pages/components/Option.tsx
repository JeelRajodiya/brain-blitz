// Function for the poll:
export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  difficulty?: number;
  quizId?: string;
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
  index: number;
}) {
  const checkBox = (
    <td className="checkBox">
      <label>
        <input
          type="checkbox"
          className="checkbox "
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
