import { ObjectId } from "mongodb";
import {
  QuestionOption,
  Difficulty,
  SelectedOption,
  AnswerSheet,
} from "./types";

export type QuizCol = {
  title: string;
  userId: string; // the user's id who created the quiz
  id: string;
  difficultyTags: boolean;
  isPoll: boolean;
  jumpQuestions: boolean;
  timeForAQuestion: number; // in seconds, 5 means you have 5 seconds to solve each question, default 30s
  markForCorrect: number; // default +4
  markForIncorrect: number; // default -1
  createdAt: Date;
  code: string;
};

export type UserCol = {
  email: string;
  id: string;
  name: string;
  dateOfJoining: Date;
  sessions: string;
  image: string;
  accessToken: string;
  idToken: string;
  createdAt: Date;
};
export type QuestionCol = {
  quizId: string; // id of the parent quiz
  id: string;
  question: string;
  options: string[]; // [A,B,C,D]
  correctOption: SelectedOption | QuestionOption; // SelectedOption is used when the user is attempting the quiz, QuestionOption is used when the user is creating the quiz
  // main difference is that SelectedOption can be null, but QuestionOption cannot be null

  difficulty?: Difficulty; // 0 means not tagged, 1 means easy, 2 means medium, 3 means hard
};

export type QuizResponseCol = {
  quizId: string;
  creatorId: string;
  respondentId: string;
  responses: AnswerSheet; // key is the question id, value is the response answer (A, B , C , D)
  correctQuestions: number;
  incorrectQuestions: number;
  skippedQuestions: number;
  positiveMarks: number;
  negativeMarks: number;
  totalMarks: number;
  hasDifficultyTags: boolean;
  maxMarks: number;
  quizTitle: string;
  _id?: ObjectId;

  Easy?: {
    correctQuestions: number;
    incorrectQuestions: number;
    skippedQuestions: number;
  };
  Medium?: {
    correctQuestions: number;
    incorrectQuestions: number;
    skippedQuestions: number;
  };
  Hard?: {
    correctQuestions: number;
    incorrectQuestions: number;
    skippedQuestions: number;
  };
  createdAt: Date;
};

export const uri = process.env.MONGO_URI as string;
if (!uri) {
  throw new Error("MONGO_URI is not defined");
}
