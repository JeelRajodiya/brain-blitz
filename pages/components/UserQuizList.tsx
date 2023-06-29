import * as React from "react";
import styles from "./UserQuizList.module.css";
import classNames from "classnames";

import Image from "next/image";
import { deleteQuiz } from "../../util/functions";
import { ParticipatedQuizzes, QuizList } from "../../util/types";
declare const window: Window &
  typeof globalThis & {
    deleteQuizModal: {
      showModal: () => void;
      close: () => void;
      open: boolean;
    };
  };
import DeleteQuizToast from "./DeleteQuizToast";
import CreatedQuizList from "./CreatedQuizList";
import ParticipatedQuizList from "./ParticipatedQuizList";
export default function UserQuizList({
  quizList,
  participatedQuizList,
  isLoading,
}: {
  quizList: QuizList[];
  participatedQuizList: ParticipatedQuizzes[];
  isLoading: boolean;
}) {
  // states for the toast message

  // Added tabs!

  const [SelectedTab, setSelectedTab] = React.useState("made");
  const madeTabRef = React.useRef<HTMLAnchorElement>(null);
  const participatedTabRef = React.useRef<HTMLAnchorElement>(null);
  const tabsContainerRef = React.useRef<HTMLDivElement>(null);
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  const [areRefsDefined, setAreRefsDefined] = React.useState(
    madeTabRef.current && participatedTabRef.current && tabsContainerRef.current
  );
  React.useEffect(() => {
    setAreRefsDefined(
      madeTabRef.current &&
        participatedTabRef.current &&
        tabsContainerRef.current
    );
  }, [
    madeTabRef.current &&
      participatedTabRef.current &&
      tabsContainerRef.current,
  ]);

  //   console.log(quizListState.length, visibleEntries);
  return (
    <div className="flex  items-center flex-col mt-10 ">
      <div className="self-center text-xl m-2 ">Your Quizzes</div>

      <div className={styles.tableContainer}>
        <div
          className={classNames("tabs tabs-boxed  mb-1", styles.tabsContainer)}
          ref={tabsContainerRef}
        >
          {areRefsDefined && (
            <div
              className={styles.tabBox}
              style={{
                width:
                  SelectedTab == "made"
                    ? madeTabRef.current?.offsetWidth! - 10
                    : participatedTabRef.current?.offsetWidth! - 10,
                translate:
                  SelectedTab == "made"
                    ? madeTabRef.current?.getBoundingClientRect().left! -
                      tabsContainerRef.current?.getBoundingClientRect().left!
                    : participatedTabRef.current?.getBoundingClientRect()
                        .left! -
                      tabsContainerRef.current?.getBoundingClientRect().left!,
              }}
            ></div>
          )}

          <a
            className={`tab tab-md m-1 ${
              SelectedTab === "made" ? "text-primary-content" : ""
            }`}
            onClick={() => handleTabClick("made")}
            ref={madeTabRef}
          >
            Made
          </a>
          <a
            className={`tab tab-md m-1 ${
              SelectedTab === "participated" ? "text-primary-content" : ""
            }`}
            onClick={() => handleTabClick("participated")}
            ref={participatedTabRef}
          >
            Participated
          </a>
        </div>
        {SelectedTab === "made" ? (
          <CreatedQuizList quizList={quizList} isLoading={isLoading} />
        ) : (
          <ParticipatedQuizList
            participatedQuizList={participatedQuizList}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
