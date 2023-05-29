import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../../util/DB";
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

function POST(req: NextApiRequest, res: NextApiResponse) {
    const quiz: QuizCol = req.body;
    console.log(quiz);
    // const session = getServerSession(req, res, authOptions);
    // console.log(session);
    // return res.status(200);
    return res.send("Hello");
}
