import classNames from "classnames";
import styles from "./Skeleton.module.css";

export default function Skeleton({
  columns,
  extraClassName,
  rows,
}: {
  columns: number;
  rows?: number;
  extraClassName?: string;
}) {
  const columnArr = Array.from({ length: columns }, (_, index) => index);
  if (!rows) rows = 1;
  const rowArr = Array.from({ length: rows }, (_, index) => index);
  return (
    <div className={styles.skeletonContainer}>
      {columnArr.map((_, colIndex) => {
        const rowElems = rowArr.map((_, rowIndex) => (
          <div
            key={rowIndex.toString() + colIndex.toString()}
            className={classNames(
              styles.skeleton,
              styles.skeletonRow,
              extraClassName
            )}
          />
        ));
        return (
          <div key={colIndex} className={styles.skeletonColumn}>
            {rowElems}
          </div>
        );
      })}
    </div>
  );
}
