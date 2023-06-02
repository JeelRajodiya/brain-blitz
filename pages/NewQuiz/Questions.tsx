import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import DeleteButton from "../components/DeleteButton";
import { useState } from "react";

export default function Questions() {
	const router = useRouter();
	const iden = router.query.quizId;

	// for each question:
	const [timeForAQuestion, setTimeForAQuestion] = React.useState(10);
	const [markForCorrect, setMarkForCorrect] = React.useState(5);
	const [markForIncorrect, setMarkForIncorrect] = React.useState(-1);

	return (
		<>
			{/* @ts-ignore */}
			<Layout>
				{/* <h1 className="mb-5">{iden}</h1> */}

				<div className="flex  w-full questionForm">
					<div className="w-2/5">
						<div className="flex flex-row justify-between">
							<h1 className="flex text-2xl">Question panel</h1>
							<button className="btn btn-square mb-5 bg-green-500 hover:bg-green-700">
								<h1 className="text-4xl mb-5">+</h1>
							</button>
						</div>

						<table className="table table-zebra">
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>1</th>
									<td>Cy Ganderton</td>
								</tr>
								<tr>
									<th>2</th>
									<td>Hart Hagerty</td>
								</tr>
								<tr>
									<th>3</th>
									<td>Brice Swyre</td>
								</tr>
							</tbody>
						</table>
					</div>

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

						<div className="overflow-x-auto">
							<table className="table">
								<thead>
									<tr>
										<th style={{ width: "25%" }}>
											Correct Options
										</th>
										<th style={{ width: "75%" }}>
											Options
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style={{ width: "25%" }}>
											<label>
												<input
													type="checkbox"
													className="checkbox"
												/>
											</label>
										</td>
										<td style={{ width: "75%" }}>
											<input
												type="text"
												placeholder="Type option here"
												className="input input-bordered input-primary w-full"
											/>
										</td>
									</tr>
									<tr>
										<td style={{ width: "25%" }}>
											<label>
												<input
													type="checkbox"
													className="checkbox"
												/>
											</label>
										</td>
										<td style={{ width: "75%" }}>
											<input
												type="text"
												placeholder="Type option here"
												className="input input-bordered input-primary w-full"
											/>
										</td>
									</tr>
									<tr>
										<td style={{ width: "25%" }}>
											<label>
												<input
													type="checkbox"
													className="checkbox"
												/>
											</label>
										</td>
										<td style={{ width: "75%" }}>
											<input
												type="text"
												placeholder="Type option here"
												className="input input-bordered input-primary w-full"
											/>
										</td>
									</tr>
									<tr>
										<td style={{ width: "25%" }}>
											<label>
												<input
													type="checkbox"
													className="checkbox"
												/>
											</label>
										</td>
										<td style={{ width: "75%" }}>
											<input
												type="text"
												placeholder="Type option here"
												className="input input-bordered input-primary w-full"
											/>
										</td>
									</tr>
								</tbody>
							</table>

							<div>
								<div className="flex justify-between">
									<label className="label m-5">
										<span className=" txtf label-text">
											Time for the question{" "}
										</span>
									</label>
									<input
										type="number"
										placeholder="10"
										className=" m-5 txtin input input-bordered"
										value={timeForAQuestion}
										onChange={(e) => {
											setTimeForAQuestion(
												Number(e.target.value)
											);
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
											setMarkForCorrect(
												Number(e.target.value)
											);
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
											setMarkForIncorrect(
												Number(e.target.value)
											);
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}
