import Layout from "./../Layout";
import * as React from "react";
import { useRouter } from "next/router";

export default function NewQuiz() {
	const [quizName, setQuizName] = React.useState("");
	const [enableDifficultyTags, setEnableDifficultyTags] =
		React.useState(false);
	const [enablePolls, setEnablePolls] = React.useState(false);
	const [jumpQuestions, setJumpQuestions] = React.useState(false);
	const [timeForAQuestion, setTimeForAQuestion] = React.useState(10);
	const [markForCorrect, setMarkForCorrect] = React.useState(5);
	const [markForIncorrect, setMarkForIncorrect] = React.useState(-1);
	const router = useRouter();
	const createQuiz = async () => {
		const res = await fetch("/api/createQuiz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: quizName,
				difficultyTags: enableDifficultyTags,
				isPolls: enablePolls,
				jumpQuestions: jumpQuestions,
				timeForAQuestion: timeForAQuestion,
				markForCorrect: markForCorrect,
				markForIncorrect: markForIncorrect,
			}),
		});
		const quizId = (await res.json()).quizId;
		router.push({ pathname: `/NewQuiz/Questions`, query: { quizId } });
	};
	return (
		// @ts-ignore
		<Layout pageTitle={"New Quiz"}>
			<div className="flex flex-col">
				<div className="flex flex-col ">
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">Quiz Name</span>
						</label>
						<input
							type="text"
							placeholder="My awesome quiz"
							className="txtin m-5 input input-bordered"
							value={quizName}
							onChange={(e) => setQuizName(e.target.value)}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">
								Enable Difficultly Tags{" "}
							</span>
						</label>
						<input
							type="checkbox"
							className="toggle toggle-md toggle-accent m-5"
							onChange={(e) => {
								setEnableDifficultyTags(e.target.checked);
							}}
							checked={enableDifficultyTags}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">
								Enable Polls{" "}
							</span>
						</label>
						<input
							type="checkbox"
							className="toggle toggle-md toggle-accent m-5"
							onChange={(e) => {
								setEnablePolls(e.target.checked);
							}}
							checked={enablePolls}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">
								Jump Questions{" "}
							</span>
						</label>
						<input
							type="checkbox"
							className="toggle toggle-md toggle-accent m-5"
							onChange={(e) => {
								setJumpQuestions(e.target.checked);
							}}
							checked={jumpQuestions}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">
								Time for a question{" "}
							</span>
						</label>
						<input
							type="number"
							placeholder="10"
							className=" m-5 txtin input input-bordered"
							value={timeForAQuestion}
							onChange={(e) => {
								setTimeForAQuestion(Number(e.target.value));
							}}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">
								Mark for correct{" "}
							</span>
						</label>
						<input
							type="number"
							placeholder="5"
							className=" m-5 input txtin input-bordered"
							value={markForCorrect}
							onChange={(e) => {
								setMarkForCorrect(Number(e.target.value));
							}}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label m-5">
							<span className=" txtf label-text">
								Mark for incorrect{" "}
							</span>
						</label>
						<input
							type="number"
							placeholder="-1"
							className=" m-5 input txtin input-bordered"
							value={markForIncorrect}
							onChange={(e) => {
								setMarkForIncorrect(Number(e.target.value));
							}}
						/>
					</div>
				</div>

				<div className="bb  justify-end">
					<button
						className="btn btn-primary btn-active w-48 h-20"
						disabled={!quizName}
						onClick={createQuiz}
					>
						Click me
					</button>
				</div>
			</div>
		</Layout>
	);
}
