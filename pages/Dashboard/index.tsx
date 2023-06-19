import QuizActions from "./../components/QuizActions";
import * as React from "react";
import Layout from "../Layout";
export default function Dashboard() {
  return (
    //@ts-ignore
    <Layout pageTitle={"Dashboard"}>
      <QuizActions />
    </Layout>
  );
}
