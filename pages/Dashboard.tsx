import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Dashboard() {
	const session = useSession();
	const router = useRouter();
	if (session.status == "unauthenticated") {
		return router.push("/LandingPage");
	}
	const performSignOut = () => {
		signOut();
		router.push("/LandingPage");
	};
	return (
		<div className="flex justify-center">
			<div className="">
				<h1>Dashboard</h1>
			</div>
			<button className="btn" onClick={performSignOut}>
				Log out
			</button>
		</div>
	);
}
