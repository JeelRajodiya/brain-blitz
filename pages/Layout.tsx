import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Layout({ children, pageTitle }) {
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
						<h1
							className="text-3xl font-bold cursor-pointer"
							onClick={() => router.push("/Dashboard")}
						>
							<span className="animate-fire">Brain</span>
							<span className="animate-fire">Blitz</span>
						</h1>
						{/* <h1 className="text-3xl font-bold cursor-default">
							{"-" + pageTitle}
						</h1> */}
					</div>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn-circle"
						>
							<div className="w-14 mask mask-squircle">
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
							className="dropdown-content menu p-2 bg-base-300  shadow rounded-box w-52 mt-5"
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
			{children}
		</div>
	);
}
