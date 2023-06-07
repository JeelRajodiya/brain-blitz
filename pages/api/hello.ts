// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
export default async (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  const counter = await kv.get("counter");
  if (counter != undefined) {
    kv.set("counter", (counter as number) + 1);
  } else {
    kv.set("counter", 0);
  }
  res.status(200).json({ counts: counter });
};
