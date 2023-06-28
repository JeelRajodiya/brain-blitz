import { updateResult } from "../../util/slices/resultSlice";
import { ParticipatedQuizzes, QuizResult } from "../../util/types";
import styles from "./CreatedQuizList.module.css";
import React from "react";
import joinQuizStyles from "./../JoinQuiz/JoinQuiz.module.css";
import classNames from "classnames";
import { ObjectId } from "mongodb";
import { NextRouter, useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";

async function fetchResult(
  id: ObjectId,
  setIsLoading: Function,
  router: NextRouter,
  dispatch: Dispatch<AnyAction>
) {
  setIsLoading(true);
  const res = await fetch(`/api/getResult?id=${id}`);
  const data = (await res.json()) as QuizResult;
  dispatch(updateResult(data));

  setIsLoading(false);
  router.push("/JoinQuiz/QuizResult");
}
export default function ParticipatedQuizList({
  participatedQuizList,
}: {
  participatedQuizList: ParticipatedQuizzes[];
}) {
  const entries = participatedQuizList?.length;
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleEntries, setVisibleEntries] = React.useState(5);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.tableHeading}>
        <div>Title</div>
        <div>Marks</div>
        <div>Created At</div>
      </div>
      {participatedQuizList?.slice(0, visibleEntries).map((quiz) => {
        return (
          <div
            key={quiz._id.toString()}
            className={styles.tableElement}
            onClick={() =>
              fetchResult(quiz._id, setIsLoading, router, dispatch)
            }
          >
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
      {isLoading && (
        <div
          className={classNames("alert alert-warning ", joinQuizStyles.toast)}
        >
          <span>Loading...</span>
          <span className="loading loading-infinity loading-md"></span>
        </div>
      )}
    </>
  );
}
