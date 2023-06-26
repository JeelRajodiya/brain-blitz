import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "./QuizResult.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../util/store";

let difficultyEnabled = false;

export default function QuizResult() {
  const result = useSelector((state: RootState) => state.quizResult.value);

  return (
    //@ts-ignore
    <Layout>
      <div>
        <h1 className={styles.heading}>ScoreBoard</h1>
        <div className={styles.container}>
          {/* child 1 */}
          <div>
            <div className={styles.scoreCard}>
              <div className={styles.topPart}>
                <div
                  className="radial-progress text-primary"
                  style={
                    {
                      "--value": "70",
                      "--size": "12rem",
                      "--thickness": "8px",
                    } as React.CSSProperties
                  }
                >
                  <h1 className={styles.marks}>
                    <div className={styles.firstNumber}>
                      {result.totalMarks}
                    </div>
                    <div className={styles.middleSlash}>/</div>
                    <div className={styles.lastNumber}>{result.maxMarks}</div>
                  </h1>
                </div>
              </div>
              <div className={styles.bottomPart}>
                {result.totalMarks}/{result.maxMarks}
              </div>
            </div>
          </div>
          {/* child 2 */}
          <div className={styles.containerTwo}>
            {/* Grand total */}
            <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200 w-full text-center">
              <div className="stat">
                <div className="stat-title">Correct Attempt</div>
                <div className="stat-value">31K</div>
              </div>

              <div className="stat">
                <div className="stat-title">Incorrect Attempt</div>
                <div className="stat-value">4,200</div>
              </div>

              <div className="stat">
                <div className="stat-title">Skipped Questions</div>
                <div className="stat-value">1,200</div>
              </div>
            </div>

            {/* for easy */}
            {!difficultyEnabled && (
              <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200 w-full text-center">
                <div className="stat">
                  <div className="stat-title">Correct Attempt</div>
                  <div className="stat-value">31K</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Incorrect Attempt</div>
                  <div className="stat-value">4,200</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Skipped Questions</div>
                  <div className="stat-value">1,200</div>
                </div>
              </div>
            )}

            {/* for easy */}
            {!difficultyEnabled && (
              <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200 w-full text-center">
                <div className="stat">
                  <div className="stat-title">Correct Attempt</div>
                  <div className="stat-value">31K</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Incorrect Attempt</div>
                  <div className="stat-value">4,200</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Skipped Questions</div>
                  <div className="stat-value">1,200</div>
                </div>
              </div>
            )}

            {/* for easy */}
            {!difficultyEnabled && (
              <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200 w-full text-center">
                <div className="stat">
                  <div className="stat-title">Correct Attempt</div>
                  <div className="stat-value">31K</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Incorrect Attempt</div>
                  <div className="stat-value">4,200</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Skipped Questions</div>
                  <div className="stat-value">1,200</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
