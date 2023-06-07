import * as React from "react";
type QuizList = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
};
export default function UserQuizList({ quizList }: { quizList: QuizList[] }) {
  return (
    <div className="flex flex-col">
      <div className="  flex flex-row justify-between">
        <div>Title</div>
        <div>Code</div>
        <div>Created At</div>
      </div>
      {quizList.map((quiz, index) => {
        return (
          <div className="flex flex-row justify-between" key={quiz.id}>
            <div>{quiz.title}</div>
            <div>{quiz.code}</div>
            <div>
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
