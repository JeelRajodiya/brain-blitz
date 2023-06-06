import { NextApiRequest, NextApiResponse } from "next";
import { getDB, getUser } from "../../util/DB";
import type { QuizCol } from "../../util/DB";
import { uuid } from "uuidv4";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function createQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return POST(req, res);
  }
  // return res.send("Hello");
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const quiz: QuizCol = req.body;
  const session = await getServerSession(req, res, authOptions);
  const user = getUser(session.user.email);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  quiz.userId = (await user).id;
  quiz.id = uuid();
  quiz.createdAt = new Date();
  const db = await getDB();
  await db.collection<QuizCol>("quizzes").insertOne(quiz);
  return res.json({ quizId: quiz.id });
}
