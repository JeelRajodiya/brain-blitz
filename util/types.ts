import { ObjectId } from "mongodb";
import { QuestionCol, QuizResponseCol } from "./DB";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type SelectedOption = "A" | "B" | "C" | "D" | null; // this type is used when the user is attempting the quiz
export type QuestionOption = Exclude<SelectedOption, null>; // this type is used when the user is creating the quiz
export const ItoA: { [key: number]: QuestionOption } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

export type JoinQuizQuestion = Omit<QuestionCol, "quizId" | "correctOption">;
export type CreateQuizQuestion = Omit<QuestionCol, "id">;
export type AnswerSheet = {
  [key: string]: SelectedOption;
};
export type JoinQuizResponse = {
  code: string;
  responses: AnswerSheet;
};

export type QuizList = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
  isDeleted: boolean;
};
export type QuizResult = Omit<
  QuizResponseCol,
  "responses" | "respondentId" | "creatorId"
> & {
  creatorName: string;
};

export type ParticipatedQuizzes = {
  quizTitle: string;
  createdAt: Date;
  maxMarks: number;
  totalMarks: number;
  _id: ObjectId;
};
