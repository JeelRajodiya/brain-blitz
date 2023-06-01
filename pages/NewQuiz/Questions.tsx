import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
import DeleteButton from "../components/DeleteButton";

export default function Questions() {
	const router = useRouter();
	const iden = router.query.quizId;

	return (
		<>
			{/* @ts-ignore */}
			<Layout>
				<h1 className="mb-5">{iden}</h1>
				<div className="flex w-full questionForm">
					<div className="overflow-x-auto">
						<h1>Question panel</h1>
						<table className="table table-zebra">
							{/* head */}
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								<tr>
									<th>1</th>
									<td>Cy Ganderton</td>
									<td>
										<DeleteButton />
									</td>
								</tr>
								{/* row 2 */}
								<tr>
									<th>2</th>
									<td>Hart Hagerty</td>
									<td>
										<DeleteButton />
									</td>
								</tr>
								{/* row 3 */}
								<tr>
									<th>3</th>
									<td>Brice Swyre</td>
									<td>
										<DeleteButton />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* divider */}

					<div>
						<button className="btn btn-square mb-5 bg-green-500 hover:bg-green-700">
							<h1 className="text-4xl mb-5">+</h1>
						</button>

						<h1 className="text-lg mb-5 font-bold">Question:</h1>
						<textarea
							placeholder="Type here"
							className="input input-bordered input-primary w-full resize-y max-h-36"
						></textarea>

						<div className="overflow-x-auto">
							<table className="table">
								{/* head */}
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
									{/* row 1 */}
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
									{/* row 2 */}
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
									{/* row 3 */}
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
									{/* row 4 */}
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
						</div>
						{/* save button as follows: */}
						<button className="btn mt-4 btn-outline btn-success">Save Question</button>

					</div>

					{/* divider */}

					<div className="flex-1 card bg-base-300 rounded-box place-items-center text-sm">
						Question Settings:
					</div>
				</div>
			</Layout>
		</>
	);
}
