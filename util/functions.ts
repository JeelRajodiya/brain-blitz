import { QuizCol } from "./DB";
import { JoinQuizQuestion, JoinQuizResponse, QuizResult } from "./types";
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
  const resCreated = await fetch("/api/listUserQuizzes", {
    method: "GET",
  });
  const resParticipated = await fetch("/api/listParticipatedQuizzes", {
    method: "GET",
  });
  const jsonCreated = await resCreated.json();
  const jsonParticipated = await resParticipated.json();
  const json = {
    created: jsonCreated,
    participated: jsonParticipated,
  };
  return json;
}

export async function deleteQuiz(
  quizId: string,
  setQuizListState: React.Dispatch<React.SetStateAction<QuizList[]>>,
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  setStatusCode: React.Dispatch<React.SetStateAction<number>>
) {
  console.log(quizId);

  // start loading
  setIsDeleting(true);
  const res = await fetch("/api/createQuiz", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      id: quizId,
    },
  });

  // stop loading
  setIsDeleting(false);
  setStatusCode(res.status);
  setErrorMsg(await res.text());

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

  // hide the toast after 2 seconds
  setTimeout(() => {
    setErrorMsg("");
    setStatusCode(0);
  }, 2000);
}

export async function submitResponse(
  data: JoinQuizResponse
): Promise<QuizResult> {
  const res = await fetch("/api/joinQuiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const quizResult: QuizResult = await res.json();
  return quizResult;
}
