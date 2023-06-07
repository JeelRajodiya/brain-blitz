import Layout from "./../Layout";
import * as React from "react";
import { useRouter } from "next/router";
import { link } from "fs";

export default function QuizCode() {
  const router = useRouter();
  const { code } = router.query;
  // let text: string = {code};

  const linkTxt: string =
    "https://brain-blitz-three.vercel.app/Dashboard?quizCode=" + code;

  const copyCode = () => {
    navigator.clipboard
      .writeText(code as string)
      .then(() => {
        alert("Code copied to clipboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(linkTxt)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

            <div className="stat mb-2">
              <div className="stat-title">Quiz Code</div>
              <div className="stat-value">{code}</div>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary tooltip tooltip-bottom tooltip-info"
                data-tip="Copy code to clipboard"
                onClick={copyCode}
              >
                {/* 📋 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clipboard-data"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />{" "}
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />{" "}
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />{" "}
                </svg>
              </button>
              <button
                className="btn btn-accent tooltip tooltip-bottom  tooltip-info"
                data-tip="Copy link to clipboard"
                onClick={copyLink}
              >
                {/* share icon here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-90deg-right"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
                  />{" "}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
