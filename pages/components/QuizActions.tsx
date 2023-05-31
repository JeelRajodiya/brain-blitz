import * as React from "react";
import { useRouter } from "next/router";

function QuizForm() {
	const router = useRouter();
	return (
		<div>
			<div
				className="btn-group button-group"
				style={{ marginTop: "40px" }}
			>
				<button className="btn btn-modified join">Join Quiz</button>
				<button
					className="btn btn-modified create"
					onClick={() => router.push("/NewQuiz")}
				>
					Create Quiz
				</button>
			</div>
		</div>
	);
}

export default QuizForm;