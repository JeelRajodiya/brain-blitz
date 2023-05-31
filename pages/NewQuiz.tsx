import Layout from "./Layout";
import * as React from "react";

export default function NewQuiz() {
	// "title": "Sample Quiz",

	// "difficultyTags": true,
	// "isPoll": false,
	// "jumpQuestions": true,
	// "timeForAQuestion": 10,
	// "markForCorrect": 5,
	// "markForIncorrect": -1
	return (
		// @ts-ignore
		<Layout pageTitle={"New Quiz"}>
			<div className="flex flex-col" >
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Quiz Name</span>
					</label>
					<input
						type="text"
						placeholder="My awesome quiz"
						className=" m-5 input input-bordered"
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Difficultly Tags </span>
					</label>
					<input
						type="checkbox"
						className="toggle toggle-accent m-5"
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Is Poll </span>
					</label>
					<input
						type="checkbox"
						className="toggle toggle-accent m-5"
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Jump Questions </span>
					</label>
					<input
						type="checkbox"
						className="toggle toggle-accent m-5"
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Time for a question </span>
					</label>
					<input
						type="number"
						placeholder="10"
						className=" m-5 input input-bordered"
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Mark for correct </span>
					</label>
					<input
						type="number"
						placeholder="5"
						className=" m-5 input input-bordered"
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className="label-text">Mark for incorrect </span>
					</label>
					<input
						type="number"
						placeholder="-1"
						className=" m-5 input input-bordered"
					/>
				</div>
			</div>
		</Layout>
	);
}
