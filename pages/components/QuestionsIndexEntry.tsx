import DeleteButton from "./DeleteButton";

export default function QuestionsIndexEntry({
  name,
  setActiveQuestion,
  activeQuestion,
  id,
  deleteFunction,
  questions,
}) {
  console.log(id, activeQuestion);
  return (
    <tr
      className={`flex justify-between select-none ${
        id == activeQuestion ? "bg-primary-focus" : ""
      }`}
      onClick={() => setActiveQuestion(id)}
    >
      <td>{name}</td>
      <td>
        <DeleteButton onClick={() => deleteFunction(id)} />
      </td>
    </tr>
  );
}
