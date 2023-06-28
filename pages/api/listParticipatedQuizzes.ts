import { NextApiRequest, NextApiResponse } from "next";
import { QuizCol, QuizResponseCol, uri } from "../../util/DB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { UserCol } from "../../util/DB";
import { ParticipatedQuizzes } from "../../util/types";

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

  const responses: ParticipatedQuizzes[] = (await db
    .collection<QuizResponseCol>("quizResponses")
    .find({ respondentId: user.id })
    .project({
      maxMarks: 1,
      totalMarks: 1,
      createdAt: 1,
      quizTitle: 1,
    })
    .toArray()) as ParticipatedQuizzes[];
  return res.status(200).json(responses);
}
