import { NextApiRequest, NextApiResponse } from "next";
import { QuizCol, UserCol, QuestionCol, uri } from "../../util/DB";
import { User, getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";

export default async function joinQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const client = new MongoClient(uri);
  await client.connect();
  const db = await client.db("brain-blitz");
  const user = await db
    .collection<UserCol>("users")
    .findOne({ email: session.user.email });

  const quizCode = req.query.code as string;

  // This is under construction, because we want the user to be able to join quiz without logging in
  if (!user) {
    // user is not authenticated
    // do something
  }

  const quiz = await db
    .collection<QuizCol>("quizzes")
    .findOne({ code: quizCode });

  // check if the quiz exists
  if (!quiz) {
    res.status(404).send("Quiz not found");
  }

  // get the name of the creator of the quiz
  const creatorName = (
    await db.collection<UserCol>("users").findOne({ id: quiz.userId })
  ).name;

  // get the questions of the quiz, but without the correctOption, quizId and _id fields
  const questions = await db
    .collection<QuestionCol>("questions")
    .find(
      {
        quizId: quiz.id,
      },
      {
        projection: {
          correctOption: 0,
          quizId: 0,
          _id: 0,
        },
      }
    )
    .toArray();

  // adding some extra fields such as creatorName and questions to the quiz object
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
  await client.close();

  return res.json(quizData);
}
