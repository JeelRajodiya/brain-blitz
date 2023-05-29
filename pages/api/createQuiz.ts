import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../../util/DB";
import type { QuizCol } from "../../util/DB";

export default async function createQuiz(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //     if (req.method === "POST") {
    //         POST(req, res);
    //     }
    return res.send("Hello");
}

// function POST(req: NextApiRequest, res: NextApiResponse) {
//     const quiz: QuizCol = req.body;
//     console.log(quiz);
//     res.status(200);
// }
