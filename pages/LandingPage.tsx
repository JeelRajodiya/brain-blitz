import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
// import React from "react";

export default function LandingPage() {
	// const session = useSession();
	const router = useRouter();
	const performSignIn = () => {
		signIn();
		router.push("/Dashboard");
	};
	return (
		<div>
			<h1>Landing Page</h1>
			<button className="btn" onClick={performSignIn}>
				Login
			</button>
		</div>
	);
}
