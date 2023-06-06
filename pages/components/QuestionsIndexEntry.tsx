import DeleteButton from "./DeleteButton";

// The following are the entries of the Question Panel Table:
export default function QuestionsIndexEntry({
  name,
  setActiveQuestion,
  activeQuestion,
  index,
  deleteFunction,
}) {
  return (
    <tr
      className={`flex items-center rounded-lg select-none ${
        activeQuestion === index + 1 ? "bg-base-200" : ""
      }`}
    >
      <td
        className="py-2 cursor-pointer border hover:bg-accent rounded-lg flex-grow m-2 hover:text-black hover:font-semibold"
        style={{ borderColor: "white", borderWidth: "1px" }}
        onClick={() => setActiveQuestion(index + 1)}
      >
        <span className="">{name}</span>
      </td>
      <td>
        <DeleteButton
          onClick={() => deleteFunction(index, setActiveQuestion)}
        />
      </td>
    </tr>
  );
}
