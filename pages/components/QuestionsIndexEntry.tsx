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
      className={`flex items-center rounded-lg  w-full select-none ${
        activeQuestion === index + 1 ? "bg-base-200" : ""
      }`}
    >
      <td
        className="py-3 cursor-pointer hover:bg-primary hover:text-white border-white  rounded-lg flex-grow m-0 hover:font-semibold ${
        "
        onClick={() => setActiveQuestion(index + 1)}
      >
        <span className="">{name}</span>
      </td>
      <td className="">
        <DeleteButton
          onClick={() => deleteFunction(index, setActiveQuestion)}
        />
      </td>
    </tr>
  );
}
