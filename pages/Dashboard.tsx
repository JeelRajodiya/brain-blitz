import QuizForm from "./components/QuizActions";
import * as React from "react";
import Layout from "./Layout";
export default function Dashboard() {
  return (
    //@ts-ignore
    <Layout pageTitle={"Dashboard"}>
      <QuizForm />
      <button className="btn btn-wide btn-modified btn-primary mt-5">
        View Previous Reports
      </button>
    </Layout>
  );
}
