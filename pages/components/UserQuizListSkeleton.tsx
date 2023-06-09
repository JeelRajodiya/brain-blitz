import styles from "./UserQuizList.module.css";
import classNames from "classnames";

export default function UserQuizListSkeleton() {
  return (
    <div className="flex mt-20 items-center flex-col">
      <div
        className={classNames(`self-center text-xl`, styles.skeletonText)}
      ></div>
      <div className={classNames(`flex justify-between w-365`,styles.tableHeading, styles.skeleton)}>
        <div className="p-7"></div>
        <div className="p-7"></div>
        <div className="p-7"></div>
        <div className="p-7"></div>
      </div>

      <div
        className={classNames(
          `flex flex-row  justify-between items-center `,
          styles.displayTable
        )}
      >
        <div className={`p-2 ${styles.skeletonText}`}></div>
        <div
          className={`p-2 tooltip tooltip-top tooltip-info cursor-pointer ${styles.skeletonText}`}
        ></div>
        <div className={`p-2 text-xs ${styles.skeletonText}`}></div>
        {/* Add a button here */}
        <div
          className={`dropdown dropdown-hover justify-center flex dropdown-bottom ${styles.skeletonText}`}
        >
          <label
            tabIndex={0}
            className={`hover:bg-base-200 p-1 rounded-md ${styles.skeletonText}`}
          >
            <div></div>
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content shadow bg-base-200 rounded-box z-50 p-2 ${styles.skeletonText}`}
          >
            <li>
              <button className={`btn btn-xs btn-ghost ${styles.skeletonText}`}>
                {" "}
                Edit
              </button>
            </li>
            <li>
              <button className={`btn btn-xs btn-ghost ${styles.skeletonText}`}>
                {" "}
                Delete
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
