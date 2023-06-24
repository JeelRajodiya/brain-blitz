import { QuizCol } from "./DB";
import { JoinQuizQuestion } from "./types";

export function secondsToMandS(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  return { minutes, secondsLeft };
}

export async function fetchQuiz(code: string) {
  type Res = QuizCol & {
    questions: JoinQuizQuestion[];
  };
  const res = await fetch(`/api/joinQuiz?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json: Res = await res.json();
  return json;
}
