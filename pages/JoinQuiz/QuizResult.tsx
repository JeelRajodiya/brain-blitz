import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "./QuizResult.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../util/store";
import classNames from "classnames";

export default function QuizResult() {
  const result = useSelector((state: RootState) => state.quizResult.value);

  // set it to true if easy medium and hard are available
  let difficultyEnabled = result.hasDifficultyTags;

  let positiveScore = result.positiveMarks;
  let negativeScore = result.negativeMarks;
  let totalScore = result.totalMarks;
  let maxScore = result.maxMarks;

  let creator = result.creatorName;
  let quizName = result.quizTitle;

  let percentage = (totalScore / maxScore) * 100;

  return (
    //@ts-ignore
    <Layout>
      <div>
        <h1 className={styles.heading}>ScoreBoard</h1>
        <div className={styles.mainContainer}>
          {/* child 1 */}
          <div className={styles.mainHeader}>
            <div className={styles.scoreCard}>
              <div className={styles.topPart}>
                {percentage > 0 ? (
                  <div
                    className="radial-progress text-primary"
                    style={
                      {
                        "--value": `${percentage}`,
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
                ) : (
                  <div className="text-error">
                    <h1 className={styles.marks}>
                      <div className={styles.firstNumber}>
                        {result.totalMarks}
                      </div>
                      <div className={styles.middleSlash}>/</div>
                      <div className={styles.lastNumber}>{result.maxMarks}</div>
                    </h1>
                  </div>
                )}
              </div>
              <div className={styles.bottomPart}>
                <p> Positive score: {positiveScore}</p>
                <p> Negative score: {negativeScore}</p>
                <p> Percentage score: {percentage}%</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.title}>Quiz Information</div>
              <div className={styles.details}>
                <p className={styles.label}>Quiz Name:</p>
                <p className={styles.value}>{quizName}</p>
                <p className={styles.label}>Quiz Creator:</p>
                <p className={styles.value}>{creator}</p>
              </div>
            </div>
          </div>
          {/* child 2 */}
          <div className={styles.subContainer}>
            {/* child 1 */}
            <h1 className={styles.subHeading}>Grand Total</h1>
            <div className="stats stats-vertical  md:stats-horizontal shadow-xl bg-base-200 w-full text-center ">
              <div className="stat">
                <div className="stat-title">Correct Attempt</div>
                <div className="stat-value">{result.correctQuestions}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Incorrect Attempt</div>
                <div className="stat-value">{result.incorrectQuestions}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Skipped Questions</div>
                <div className="stat-value">{result.skippedQuestions}</div>
              </div>
            </div>
            {/* child 2 */}

            {difficultyEnabled && (
              <div className={styles.subHeading}>Difficulty Wise</div>
            )}
            {difficultyEnabled && (
              <div className={styles.diffCards}>
                <div className="stats stats-vertical shadow-xl bg-base-200 w-full text-center">
                  <div className={styles.statMainTitle}>Easy Questions</div>
                  <div className="stat">
                    <div className="stat-title">Correct Attempt</div>
                    <div className="stat-value">
                      {result.Easy?.correctQuestions}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Incorrect Attempt</div>
                    <div className="stat-value">
                      {result.Easy?.incorrectQuestions}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Skipped Questions</div>
                    <div className="stat-value">
                      {result.Easy?.skippedQuestions}
                    </div>
                  </div>
                </div>

                <div className="stats stats-vertical shadow-xl bg-base-200 w-full text-center">
                  <div className={styles.statMainTitle}>Moderate Questions</div>
                  <div className="stat">
                    <div className="stat-title">Correct Attempt</div>
                    <div className="stat-value">
                      {result.Medium?.correctQuestions}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Incorrect Attempt</div>
                    <div className="stat-value">
                      {result.Medium?.incorrectQuestions}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Skipped Questions</div>
                    <div className="stat-value">
                      {result.Medium?.skippedQuestions}
                    </div>
                  </div>
                </div>

                <div className="stats stats-vertical shadow-xl bg-base-200 w-full text-center">
                  <div className={styles.statMainTitle}>Hard Questions</div>
                  <div className="stat">
                    <div className="stat-title">Correct Attempt</div>
                    <div className="stat-value">
                      {result.Hard?.correctQuestions}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Incorrect Attempt</div>
                    <div className="stat-value">
                      {result.Hard?.incorrectQuestions}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Skipped Questions</div>
                    <div className="stat-value">
                      {result.Hard?.skippedQuestions}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
