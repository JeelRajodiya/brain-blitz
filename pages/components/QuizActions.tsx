import { useState } from "react";
import * as React from "react";

function QuizForm() {
	return (
		<div>
			<div
				className="btn-group button-group"
				style={{ marginTop: "40px" }}
			>
				<button className="btn btn-modified join">Join Quiz</button>
				<button className="btn btn-modified create">Create Quiz</button>
			</div>
		</div>
	);
}

export default QuizForm;
