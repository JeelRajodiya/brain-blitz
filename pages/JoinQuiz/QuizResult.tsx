import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "./QuizResult.module.css";
   import classNames from "classnames";

// for total:
let correctQuestions;
let incorrectQuestions;
let skippedQuestions;

// grand total for marks
let totalMarks;
let marks;
let percentageScore;

// for easy:
let easyCorrectQuestions;
let easyIncorrectQuestions;
let easySkippedQuestions;
let easyMarksScored;

// for medium:
let mediumCorrectQuestions;
let mediumIncorrectQuestions;
let mediumSkippedQuestions;
let mediumMarksScored;

// for hard:
let hardCorrectQuestions;
let hardIncorrectQuestions;
let hardSkippedQuestions;
let hardMarksScored;

export default function QuizResult() {
  const router = useRouter();
  const marks = router.query.marks;
  const totalMarks = router.query.totalMarks;

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
                      {marks}
                    </div>
                    <div className={styles.middleSlash}>
                      /
                    </div>
                    <div className={styles.lastNumber}>
                      {totalMarks}
                    </div>
                  </h1>
                </div>
              </div>
              <div className={styles.bottomPart}>
                {marks}/{totalMarks}
              </div>
            </div>
          </div>
          {/* child 2 */}
          <div>There</div>
        </div>
      </div>
    </Layout>
  );
}
