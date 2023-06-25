import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../Layout";

export default function QuizResult() {
  const router = useRouter();
  const marks = router.query.marks;
  const totalMarks = router.query.totalMarks;

  return (
    //@ts-ignore
    <Layout>
      <div>
        {marks}/ {totalMarks}
      </div>
    </Layout>
  );
}
