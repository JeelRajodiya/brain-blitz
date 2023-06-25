import { NextApiRequest, NextApiResponse } from "next";
import {
  QuizCol,
  UserCol,
  QuestionCol,
  uri,
  QuizResponseCol,
} from "../../util/DB";
import { User, getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { JoinQuizResponse } from "../../util/types";

export default async function joinQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  } else if (req.method === "POST") {
    return POST(req, res);
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
    return res.status(404).send("Quiz not found");
  }

  // get the name of the creator of the quiz
  const creatorName = (
    await db.collection<UserCol>("users").findOne({ id: quiz.userId })
  )?.name;

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

async function POST(req: NextApiRequest, res: NextApiResponse) {
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

  const body = req.body as JoinQuizResponse;
  if (!body.code || !body.responses) {
    return res
      .status(400)
      .send("Bad Request, missing fields [code, responses] in the body");
  }
  // This is under construction, because we want the user to be able to join quiz without logging in
  if (!user) {
    // user is not authenticated
    // do something
  }
  const quiz = await db
    .collection<QuizCol>("quizzes")
    .findOne({ code: body.code });

  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }
  const questions = await db
    .collection<QuestionCol>("questions")
    .find({ quizId: quiz?.id })
    .toArray();

  const correctMark = quiz.markForCorrect;
  const incorrectMark = quiz.markForIncorrect;

  if (questions.length !== Object.keys(body.responses).length) {
    return res
      .status(400)
      .send(
        `Bad Request, invalid number of responses. Expected ${
          questions.length
        }, got ${Object.keys(body.responses).length}`
      );
  }
  let marks = 0;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const response = body.responses[question.id];
    if (response === null) {
      continue;
    }
    if (question.correctOption === response) {
      marks += correctMark;
    } else {
      marks -= incorrectMark;
    }
  }

  const responseDoc: QuizResponseCol = {
    creatorId: quiz.userId,
    respondentId: user?.id as string,
    quizId: quiz.id,
    marks: 0,
    createdAt: new Date(),
    responses: body.responses,
  };
  responseDoc.marks = marks;

  await db.collection<QuizResponseCol>("quizResponses").insertOne(responseDoc);
  await client.close();
  console.log(marks);
  return res.status(200).send(String(marks));
}
