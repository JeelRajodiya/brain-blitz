import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";
import { decode } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    const sessionToken = session.accessToken;
    const decoded = await decode({
        token: sessionToken,
        secret: process.env.SECRET,
    });
    console.log(session.data);
    if (session) {
        res.send(decoded);
    } else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
