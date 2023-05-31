import Layout from "./Layout";
import * as React from "react";

export default function NewQuiz() {
	const [quizName, setQuizName] = React.useState("");

	const handleQuizNameChange = (event) => {
		setQuizName(event.target.value);
	};

	const handleClick = () => {
		if (quizName) {
			// Perform the desired action when the button is clicked and quizName has data
			console.log("Button clicked!");
		}
	};
	return (
		// @ts-ignore
		<Layout pageTitle={"New Quiz"}>
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
						onChange={handleQuizNameChange}
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
					/>
				</div>
				<div className="flex justify-between">
					<label className="label m-5">
						<span className=" txtf label-text">Enable Polls </span>
					</label>
					<input
						type="checkbox"
						className="toggle toggle-md toggle-accent m-5"
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
					/>
				</div>

				<button
					className="btn btn-primary btn-active mt-7 w-48 h-20 fixed bottom-10 right-10"
					disabled={!quizName}
				>
					{!quizName ? "Click me" : "Fuck me"}
				</button>
			</div>
		</Layout>
	);
}
