import { NextApiRequest, NextApiResponse } from "next";
import { getDB, getUser } from "../../util/DB";
import type { QuizCol } from "../../util/DB";
import { uuid } from "uuidv4";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { get } from "http";

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
    console.log(quiz);
    const session = await getServerSession(req, res, authOptions);
    const user = getUser(session.user.email);
    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    quiz.userId = (await user).id;
    quiz.id = uuid();
    const db = await getDB();
    await db.collection<QuizCol>("quizzes").insertOne(quiz);
    return res.status(200).send("OK");
}
