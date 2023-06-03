import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import DeleteButton from "../components/DeleteButton";
import { useState } from "react";

const IndexEntry = ({ srNo, name }) => (
  <tr className="flex justify-between">
    <td>{srNo}</td>
    <td>{name}</td>
    <td>
      <DeleteButton />
    </td>
  </tr>
);

function Option({ isPoll }: { isPoll: boolean }) {
  const checkBox = (
    <td className="checkBox">
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </td>
  );
  console.log(isPoll);
  return (
    <tr>
      {!isPoll ? checkBox : null}

      <td className="OptionBox">
        <input
          type="text"
          placeholder="Type option here"
          className="input input-bordered input-primary w-full"
        />
      </td>
    </tr>
  );
}

function DifficultlyTag() {
  return (
    <>
      {/* Divider */}
      <div className="divider"></div>

      {/* Question Settings: */}
      <h1 className="text-2xl mb-4">Question Settings:</h1>
      <div>
        {/* difficulty tag: */}

        <div className="flex justify-between">
          <label className="label m-5">
            <span className=" txtf label-text">
              Difficulty (double click on stars){" "}
            </span>
          </label>
          <div className="rating rating-lg m-5">
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Questions() {
  const router = useRouter();
  const {
    title,
    difficultyTags,
    isPolls,
    jumpQuestions,
    timeForAQuestion,
    markForCorrect,
    markForIncorrect,
  } = router.query;
  return (
    <>
      {/* @ts-ignore */}
      <Layout>
        {/* <h1 className="mb-5">{iden}</h1> */}

        <div className="flex w-full questionForm">
          {/* Question Panel Div */}
          <div className="w-2/5">
            <div className="flex flex-row mt-4 justify-between">
              <h1 className="flex text-2xl">Question panel</h1>
              <button className="btn btn-square mb-5 bg-green-500 hover:bg-green-700">
                <h1 className="text-4xl mb-5">+</h1>
              </button>
            </div>

            {/* Question Panel Table */}
            <table className="table table-zebra">
              <thead>
                <tr className="grid grid-cols-3">
                  <th className="justify-self-start">Sr.</th>
                  <th className="justify-self-center">Name</th>
                  <th className="justify-self-end">Action</th>
                </tr>
              </thead>

              <tbody>
                <IndexEntry srNo={1} name="Question 1" />
                <IndexEntry srNo={2} name="Question 2" />
                <IndexEntry srNo={3} name="Question 3" />
              </tbody>
            </table>
            <button className="btn btn-success mt-4 mb-4 w-full btn-wide text-center">
              Save Quiz
            </button>
          </div>

          {/* Add a verticle divider here: it does not work */}
          <div className="divider divider-horizontal"></div>
          {/* Question Form Div */}
          <div className="w-3/5">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl mb-4">Question:</h1>
              <button className="btn mb-4 btn-outline btn-success">
                Save Question
              </button>
            </div>

            <div>
              <textarea
                placeholder="Type here"
                className="input input-bordered input-primary w-full resize-y max-h-36"
              ></textarea>
            </div>

            {/* MCQ details table */}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="checkBox">Correct Options</th>
                    <th className="OptionBox">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => {
                    return (
                      <Option
                        key={i}
                        isPoll={isPolls == "true" ? true : false}
                      />
                    );
                  })}
                </tbody>
              </table>

              {difficultyTags == "true" ? <DifficultlyTag /> : ""}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
