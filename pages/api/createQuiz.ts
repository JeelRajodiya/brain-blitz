import { NextApiRequest, NextApiResponse } from "next";
import { QuestionCol, UserCol, uri } from "../../util/DB";
import type { QuizCol } from "../../util/DB";
import { uuid } from "uuidv4";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";

function generateUID() {
  // generates a 6 digit code

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
}

// function ot create a quiz
async function POST(req: NextApiRequest, res: NextApiResponse) {
  const quiz: QuizCol = req.body;
  const session = await getServerSession(req, res, authOptions);
  const client = new MongoClient(uri);
  await client.connect();
  const db = await client.db("brain-blitz");
  const user = await db
    .collection<UserCol>("users")
    .findOne({ email: session.user.email });

  // check if the user is authenticated
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  // creating necessary fields for the quiz
  quiz.userId = (await user).id;
  quiz.id = uuid();
  quiz.code = generateUID(); // generate a 6 digit code
  quiz.createdAt = new Date();

  // insert the quiz into the database
  await db.collection<QuizCol>("quizzes").insertOne(quiz);
  await client.close();

  // return the quiz id and code
  return res.json({ quizId: quiz.id, code: quiz.code });
}

// function to delete a quiz
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const client = new MongoClient(uri);
  await client.connect();
  const db = await client.db("brain-blitz");

  const user = await db
    .collection<UserCol>("users")
    .findOne({ email: session.user.email });

  // check if the user is authenticated
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  // get the quiz id from the request header
  const quizId = req.headers.id;

  // delete the quiz from quizzes collection
  const QuizDel = await db
    .collection<QuizCol>("quizzes")
    .deleteOne({ id: quizId });

  // delete the questions from questions collection
  const QueDel = await db
    .collection<QuestionCol>("questions")
    .deleteMany({ quizId: quizId });
  await client.close();

  // return the appropriate response based on the deletion status
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
