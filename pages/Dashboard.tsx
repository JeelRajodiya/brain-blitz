import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import QuizForm from "./components/QuizActions";
import * as React from "react";

export default function Dashboard() {
	const session = useSession();
	const router = useRouter();

	if (session.status == "unauthenticated") {
		return router.push("/LandingPage");
	}
	const performSignOut = () => {
		signOut({ callbackUrl: "/LandingPage" });
	};

	return (
		<div className="flex justify-center flex-col center">
			<div className="navbar bg-base-200 shadow-md p-2 mx-2 mb-4">
				<div className="flex-1">
					<div className="center">
						<h1 className="text-5xl font-bold">Dashboard</h1>
					</div>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-24 mask mask-squircle">
								{session.data && session.data.user?.image && (
									<img
										src={session.data.user.image}
										alt="User Avatar"
									/>
								)}
							</div>
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a>profile</a>
							</li>
							<li>
								<a>settings</a>
							</li>
							<li>
								<a onClick={performSignOut}>logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<QuizForm></QuizForm>
		</div>
	);
}
