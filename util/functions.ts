import { QuizCol } from "./DB";
import { JoinQuizQuestion, JoinQuizResponse } from "./types";
import { QuizList } from "./types";
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
export async function fetchQuizList() {
  const res = await fetch("/api/listUserQuizzes", {
    method: "GET",
  });
  const json = await res.json();
  return json;
}

export async function deleteQuiz(
  quizId: string,
  setQuizListState: React.Dispatch<React.SetStateAction<QuizList[]>>
) {
  console.log(quizId);
  const res = await fetch("/api/createQuiz", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      id: quizId,
    },
  });

  if (res.status === 200) {
    setQuizListState((prev) =>
      prev.map((quiz) => {
        if (quiz.id === quizId) {
          quiz.isDeleted = true;
        }
        return quiz;
      })
    );
  }
}

export async function submitResponse(data: JoinQuizResponse): Promise<number> {
  const res = await fetch("/api/joinQuiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return Number(json.marks as string);
}
