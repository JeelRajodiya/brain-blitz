import { NextApiRequest, NextApiResponse } from "next";
import { uri } from "../../util/DB";
import type { QuestionCol } from "../../util/DB";
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
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const questions = req.body as QuestionCol[];
  const session = await getServerSession(req, res, authOptions);
  const client = new MongoClient(uri);
  await client.connect();
  const db = await client.db("brain-blitz");
  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  // check if the user is authenticated
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  // generate a unique id for each question
  questions.forEach((question) => {
    question.id = uuid();
  });

  // insert the questions into the database
  await db.collection<QuestionCol>("questions").insertMany(questions);
  await client.close();
  return res.send("Done");
}
