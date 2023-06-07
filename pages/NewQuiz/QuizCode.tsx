import Layout from "./../Layout";
import * as React from "react";
import { useRouter } from "next/router";

export default function QuizCode() {
  const router = useRouter();
  const { code } = router.query;

  return (
    // @ts-ignore
    <Layout>
      <div
        className="flex justify-center items-center transform translate-y-1/2"
        style={{ scale: "1.2" }}
      >
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-xl">Invite folks to your Quiz</h1>

            <div className="stat mb-3">
              <div className="stat-title">Quiz Code</div>
              <div className="stat-value">{code}</div>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Copy Code</button>
              <button className="btn btn-secondary">Copy Link</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
