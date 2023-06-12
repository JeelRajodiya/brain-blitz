import { NextApiRequest, NextApiResponse } from "next";
import { QuizCol, UserCol, getDB, getUser, QuestionCol } from "../../util/DB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function joinQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  }
  // return res.send("Hello");
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const db = await getDB();
  const user = getUser(session.user.email);
  const quizCode = req.query.code as string;

  if (!user) {
    // user is not authenticated
    // do something
  }
  const quiz = await db
    .collection<QuizCol>("quizzes")
    .findOne({ code: quizCode });
  if (!quiz) {
    res.status(404).send("Quiz not found");
  }
  const creatorName = (
    await db.collection<UserCol>("users").findOne({ id: quiz.userId })
  ).name;

  const questions = await db
    .collection<QuestionCol>("questions")
    .find({
      quizId: quiz.id,
    })
    .toArray();
  //   console.log(questions);
  const quizData = {
    title: quiz.title,
    creatorName,
    difficultyTags: quiz.difficultyTags,
    isPoll: quiz.isPoll,
    jumpQuestions: quiz.jumpQuestions,
    timeForAQuestion: quiz.timeForAQuestion,
    markForCorrect: quiz.markForCorrect,
    markForIncorrect: quiz.markForIncorrect,
    createdAt: quiz.createdAt,
    code: quiz.code,
    questions,
  };

  return res.json(quizData);
}
