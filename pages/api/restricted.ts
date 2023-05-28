import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (session) {
        res.send({
            content:
                "This is protected content. You can access this content because you are signed in.",
        });
    } else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
