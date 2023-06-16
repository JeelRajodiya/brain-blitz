import { MongoClient } from "mongodb";
import { User } from "next-auth";
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
  correctOption: number; // 1,2,3,4
  difficultyTag?: "easy" | "medium" | "hard";
};

export const uri = process.env.MONGO_URI;
