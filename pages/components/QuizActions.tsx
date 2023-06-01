import * as React from "react";
import { useRouter } from "next/router";

function QuizForm() {
	const router = useRouter();
	return (
		<div>
			<div className="join" style={{ marginTop: "40px" }}>
				<button className="btn glass btn-modified joinq">
					Join Quiz
				</button>
				<button
					className="btn glass btn-modified create"
					onClick={() => router.push("/NewQuiz")}
				>
					Create Quiz
				</button>
			</div>
		</div>
	);
}

export default QuizForm;
