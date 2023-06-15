import styles from "./UserQuizList.module.css";
import classNames from "classnames";

export default function UserQuizListSkeleton() {
  return (
    <div className="flex mt-20 items-center flex-col">
      <div
        className={classNames(`self-center text-2xl m-4`, styles.skeletonText)}
      ></div>

      <div className={`tabs w-1/2 m-2 ${styles.skeleton}`}>
        <a className="tabs tabs-md">{""}</a>
        <a className="tabs tabs-md">{""}</a>
      </div>

      <div
        className={classNames(
          `flex justify-between `,
          styles.tableHeading,
          styles.skeleton
        )}
      >
        <div className="p-6"></div>
        <div className="p-6"></div>
        <div className="p-6"></div>
        <div className="p-6"></div>
      </div>

      <div className={styles.displayTableSkeleton}>
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div className="flex flex-row " key={index}>
              <div className={`p-4 my-2 mx-1  ${styles.skeletonText}`}></div>
              <div className={`p-4 my-2 mx-1 ${styles.skeletonText}`}></div>
              <div className={`p-4 my-2 mx-1 ${styles.skeletonText}`}></div>
              <div className={`p-4 my-2 mx-1 ${styles.skeletonText}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
