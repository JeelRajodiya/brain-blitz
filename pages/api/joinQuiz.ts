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
import { JoinQuizResponse, QuizResult } from "../../util/types";

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

  const responseDoc: QuizResponseCol = {
    creatorId: quiz.userId,
    respondentId: user?.id as string,
    quizId: quiz.id,
    createdAt: new Date(),
    responses: body.responses,
    correctQuestions: 0,
    incorrectQuestions: 0,
    skippedQuestions: 0,
    positiveMarks: 0,
    negativeMarks: 0,
    totalMarks: 0,
    quizTitle: quiz.title,
    maxMarks: questions.length * quiz.markForCorrect,
    hasDifficultyTags: quiz.difficultyTags,
  };

  if (quiz.difficultyTags) {
    responseDoc.Easy = {
      correctQuestions: 0,
      incorrectQuestions: 0,
      skippedQuestions: 0,
    };
    responseDoc.Medium = {
      correctQuestions: 0,
      incorrectQuestions: 0,
      skippedQuestions: 0,
    };
    responseDoc.Hard = {
      correctQuestions: 0,
      incorrectQuestions: 0,
      skippedQuestions: 0,
    };
  }
  // Remember: incorrect marks are negative
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const userResponse = body.responses[question.id];
    if (userResponse === null) {
      responseDoc.skippedQuestions += 1;
    } else if (question.correctOption === userResponse) {
      responseDoc.totalMarks += correctMark;
      responseDoc.correctQuestions += 1;
      responseDoc.positiveMarks += correctMark;
    } else {
      responseDoc.totalMarks += incorrectMark;
      responseDoc.incorrectQuestions += 1;
      responseDoc.negativeMarks += incorrectMark;
    }

    if (
      responseDoc.hasDifficultyTags &&
      responseDoc.Easy &&
      responseDoc.Medium &&
      responseDoc.Hard
    ) {
      let questionDifficulty = question.difficulty!;

      if (userResponse === null) {
        if (questionDifficulty == "Easy") {
          responseDoc.Easy.skippedQuestions += 1;
        } else if (questionDifficulty == "Medium") {
          responseDoc.Medium.skippedQuestions += 1;
        } else if (questionDifficulty == "Hard") {
          responseDoc.Hard.skippedQuestions += 1;
        }
      } else if (question.correctOption === userResponse) {
        if (questionDifficulty == "Easy") {
          console.log(questionDifficulty);
          responseDoc.Easy.correctQuestions += 1;
        } else if (questionDifficulty == "Medium") {
          responseDoc.Medium.correctQuestions += 1;
        } else if (questionDifficulty == "Hard") {
          responseDoc.Hard.correctQuestions += 1;
        }
      } else {
        if (questionDifficulty == "Easy") {
          responseDoc.Easy.incorrectQuestions += 1;
        } else if (questionDifficulty == "Medium") {
          responseDoc.Medium.incorrectQuestions += 1;
        } else if (questionDifficulty == "Hard") {
          responseDoc.Hard.incorrectQuestions += 1;
        }
      }
      console.log(responseDoc[questionDifficulty]);
    }
  }
  await db.collection<QuizResponseCol>("quizResponses").insertOne(responseDoc);
  // remove the responses field from the responseDoc
  const { responses, creatorId, respondentId, ...result }: QuizResponseCol =
    responseDoc;
  const quizResult: QuizResult = result as QuizResult;
  quizResult.creatorName = (
    await db.collection<UserCol>("users").findOne({ id: quiz.userId })
  )?.name!;

  await client.close();
  return res.json(quizResult);
}
