import { NextApiRequest, NextApiResponse } from "next";
import { QuizCol, QuizResponseCol, uri } from "../../util/DB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient, ObjectId } from "mongodb";
import { UserCol } from "../../util/DB";
import type { QuizResult } from "../../util/types";
export default async function createQuiz(
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
  const resultId = req.query.id as string;
  if (!resultId) {
    return res.status(400).send("Bad Request, id not provided");
  }

  await client.connect();
  const db = await client.db("brain-blitz");
  if (!session?.user) {
    return res.status(401).send("Unauthorized");
  }
  const user = await db
    .collection<UserCol>("users")
    .findOne({ email: session.user.email as string });

  // check if the user is authenticated
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  const response = await db
    .collection<QuizResponseCol>("quizResponses")
    .findOne({ _id: new ObjectId(resultId) });

  if (!response) {
    return res.status(404).send("Not Found");
  }
  const quiz = await db
    .collection<QuizCol>("quizzes")
    .findOne({ id: response.quizId });

  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }
  const { responses, creatorId, respondentId, ...result }: QuizResponseCol =
    response;
  const quizResult: QuizResult = result as QuizResult;
  quizResult.creatorName = (
    await db.collection<UserCol>("users").findOne({ id: quiz.userId })
  )?.name!;
  return res.status(200).json(quizResult);
}
