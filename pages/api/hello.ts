// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  const counter = await kv.get("counter");
  if (counter != undefined) {
    kv.incr("counter");
    kv.set("counter", (counter as number) + 1);
  } else {
    kv.set("counter", 0);
  }
  res.status(200).json({ counts: counter });
};
