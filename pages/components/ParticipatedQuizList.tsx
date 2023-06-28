import { ParticipatedQuizzes } from "../../util/types";
import styles from "./CreatedQuizList.module.css";

export default function ParticipatedQuizList({
  participatedQuizList,
}: {
  participatedQuizList: ParticipatedQuizzes[];
}) {
  return (
    <>
      <div className={styles.tableHeading}>
        <div>Title</div>
        <div>Marks</div>
        <div>Created At</div>
      </div>
      {participatedQuizList.map((quiz) => {
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
    </>
  );
}
