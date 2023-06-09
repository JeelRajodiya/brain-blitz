import { NextApiRequest, NextApiResponse } from "next";
import { QuestionCol, getDB, getUser } from "../../util/DB";
import type { QuizCol } from "../../util/DB";
import { uuid } from "uuidv4";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart: number | string = (Math.random() * 46656) | 0;
  var secondPart: number | string = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}
export default async function createQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return POST(req, res);
  } else if (req.method === "DELETE") {
    return DELETE(req, res);
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
  quiz.code = generateUID();
  quiz.createdAt = new Date();
  const db = await getDB();
  await db.collection<QuizCol>("quizzes").insertOne(quiz);
  return res.json({ quizId: quiz.id, code: quiz.code });
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const user = getUser(session.user.email);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  const db = await getDB();
  const quizId = req.headers.id;
  const QuizDel = await db
    .collection<QuizCol>("quizzes")
    .deleteOne({ id: quizId });
  const QueDel = await db
    .collection<QuestionCol>("questions")
    .deleteMany({ quizId: quizId });

  if (QuizDel.acknowledged && QueDel.acknowledged) {
    return res.status(200).send("Done");
  } else if (!QuizDel.acknowledged && !QueDel.acknowledged) {
    return res.status(500).send("Quiz and Questions not deleted");
  } else if (!QuizDel.acknowledged) {
    return res.status(500).send("Quiz not deleted");
  } else if (!QueDel.acknowledged) {
    return res.status(500).send("Questions not deleted");
  }
}
