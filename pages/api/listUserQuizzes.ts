import { NextApiRequest, NextApiResponse } from "next";
import { uri } from "../../util/DB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { UserCol } from "../../util/DB";

export default async function createQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  }
  // return res.send("Hello");
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const client = new MongoClient(uri);
  await client.connect();
  const db = await client.db("brain-blitz");
  const user = await db
    .collection<UserCol>("users")
    .findOne({ email: session.user.email });

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const quizzes = await db.collection("users").aggregate([
    { $match: { email: session.user.email } }, // Match the user by email
    {
      $lookup: {
        from: "quizzes", // Join with the "data" collection
        localField: "id", // Field in the "users" collection
        foreignField: "userId", // Field in the "data" collection
        as: "quizData", // Alias for the joined data
      },
    },
    { $unwind: "$quizData" }, // Flatten the joined data (optional)
    { $project: { _id: 0, quizData: 1 } }, // Project only the desired fields
  ]);

  quizzes.map((quiz) => {
    let quizData = quiz.quizData;
    let { id, title, code, createdAt } = quizData;
    quizData = { id, title, code, createdAt };
    return quizData;
  });
  const finalData = await quizzes.toArray();
  await client.close();

  return res.json(finalData);
}
