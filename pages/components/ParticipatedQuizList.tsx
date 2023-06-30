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
import Skeleton from "./Skeleton";
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

function TableElements({
  participatedQuizList,
  visibleEntries,
  setIsResultLoading,
  router,
  dispatch,
}: {
  participatedQuizList: ParticipatedQuizzes[];
  visibleEntries: number;
  setIsResultLoading: Function;
  router: NextRouter;
  dispatch: Dispatch<AnyAction>;
}) {
  return (
    <>
      {participatedQuizList?.slice(0, visibleEntries).map((quiz) => {
        return (
          <div
            key={quiz._id.toString()}
            className={styles.tableElement}
            onClick={() =>
              fetchResult(quiz._id, setIsResultLoading, router, dispatch)
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
    </>
  );
}

export default function ParticipatedQuizList({
  participatedQuizList,
  isLoading,
}: {
  participatedQuizList: ParticipatedQuizzes[];
  isLoading: boolean;
}) {
  const entries = participatedQuizList?.length;
  const [isResultLoading, setIsResultLoading] = React.useState(false);
  const [visibleEntries, setVisibleEntries] = React.useState(5);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      {(participatedQuizList!.length != 0 || isLoading) && (
        <div className={styles.tableHeading}>
          <div>Title</div>
          <div>Marks</div>
          <div>Created At</div>
        </div>
      )}
      {isLoading ? (
        <Skeleton columns={4} />
      ) : participatedQuizList!.length ? (
        <TableElements
          participatedQuizList={participatedQuizList}
          visibleEntries={visibleEntries}
          setIsResultLoading={setIsResultLoading}
          router={router}
          dispatch={dispatch}
        />
      ) : (
        <div className={styles.noEntriesBox}>
          You have not participated any quizzes.
          <br />
          <div className="p-2">
            {" "}
            Click on <span className={styles.smJoinBtn}>Join Quiz</span> to join
          </div>
          <div className="py-1">
            Enter <span className={styles.dummyCode}>49gs6w</span> to get
            started
          </div>
        </div>
      )}
      {entries > 5 && entries > visibleEntries && (
        <button
          className="btn w-4/5 join-item m-1 mt-2 btn-outline btn-accent"
          onClick={() => setVisibleEntries(visibleEntries + 5)}
        >
          Show More
        </button>
      )}
      {isResultLoading && (
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
