import { NextApiRequest, NextApiResponse } from "next";
import { uri } from "../../util/DB";
import type { QuizCol, QuestionCol } from "../../util/DB";
import { uuid } from "uuidv4";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";

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
  const questions = req.body as QuestionCol[];
  const session = await getServerSession(req, res, authOptions);
  const client = new MongoClient(uri);
  const db = await client.db("brain-blitz");
  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  // const userId = (await user).id;
  console.log(typeof questions);
  questions.forEach((question) => {
    question.id = uuid();
  });

  await db.collection<QuestionCol>("questions").insertMany(questions);
  client.close();
  return res.send("Done");
}
