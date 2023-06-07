import Layout from "./../Layout";
import * as React from "react";
import { useRouter } from "next/router";

export default function QuizCode() {
  const router = useRouter();
  const { code } = router.query;

  return (
    // @ts-ignore
    <Layout>
      <div className="flex flex-col">{code}</div>
    </Layout>
  );
}
