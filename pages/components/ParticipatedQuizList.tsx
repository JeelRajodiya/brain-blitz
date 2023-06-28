import { ParticipatedQuizzes } from "../../util/types";
import styles from "./CreatedQuizList.module.css";
import React from "react";
export default function ParticipatedQuizList({
  participatedQuizList,
}: {
  participatedQuizList: ParticipatedQuizzes[];
}) {
  const entries = participatedQuizList.length;
  const [visibleEntries, setVisibleEntries] = React.useState(5);

  return (
    <>
      <div className={styles.tableHeading}>
        <div>Title</div>
        <div>Marks</div>
        <div>Created At</div>
      </div>
      {participatedQuizList?.slice(0, visibleEntries).map((quiz) => {
        return (
          <div className={styles.tableElement}>
            <div>{quiz.quizTitle}</div>
            <div>{quiz.totalMarks}</div>
            <div>
              {new Date(quiz.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        );
      })}
      {entries > 5 && entries > visibleEntries && (
        <button
          className="btn w-4/5 join-item m-5 btn-outline btn-accent"
          onClick={() => setVisibleEntries(visibleEntries + 5)}
        >
          Show More
        </button>
      )}
    </>
  );
}
