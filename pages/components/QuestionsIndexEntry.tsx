import DeleteButton from "./DeleteButton";
import * as React from "react";

// The following are the entries of the Question Panel Table:
export default function QuestionsIndexEntry({
  name,
  setActiveQuestion,
  activeQuestion,
  index,
  deleteFunction,
}: {
  name: string;
  setActiveQuestion: Function;
  activeQuestion: number;
  index: number;
  deleteFunction: Function;
}) {
  return (
    <div
      className={`flex  justify-center rounded-lg select-none  ${
        activeQuestion === index + 1 ? "bg-base-200" : ""
      }`}
    >
      <span
        className=" cursor-pointer items-center p-2 rounded-lg hover:bg-primary flex w-full justify-center hover:text-white  hover:font-semibold "
        onClick={() => setActiveQuestion(index + 1)}
      >
        {name}
      </span>

      <DeleteButton onClick={() => deleteFunction(index, setActiveQuestion)} />
    </div>
  );
}
