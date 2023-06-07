import * as React from "react";
type QuizList = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
};
export default function UserQuizList({ quizList }: { quizList: QuizList[] }) {
  return (
    <div className="gird grid-cols-1 grid-flow-row">
      <div className="grid grid-cols-3  ">
        <div className="col-span-1">Title</div>
        <div className="col-span-2 ">Code</div>
        <div className="col-span-3 ">Created At</div>
      </div>
      {quizList.map((quiz, index) => {
        return (
          <div className="grid col-span-3 row-span-1" key={quiz.id}>
            <div className="col-span-1">{quiz.title}</div>
            <div className="col-span-2">{quiz.code}</div>
            <div className="col-span-3">
              {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                year: "numeric", // Display the full year (e.g., "2023")
                month: "long", // Display the full month name (e.g., "January")
                day: "numeric",
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
