import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function LandingPage() {
	const session = useSession();
	const router = useRouter();
	if (session.status == "authenticated") {
		return router.push("/Dashboard");
	}
	const performSignIn = () => {
		signIn(null, { callbackUrl: "/Dashboard" });
	};

	return (
		// ALTERNATE LOGIN FORM:
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row">
				<div className="text-center lg:text-left lg:w-1/2">
					<h1 className="text-7xl font-bold">
						<span className="animate-fire">Brain</span>
						<span className="animate-fire">Blitz</span>
					</h1>
					<br></br>
					<h1 className="text-4xl font-bold">Login now!</h1>
					<br></br>
					<p className="py-6 text-2xl font-bold leading-8">
						<span className="text-blue-400 animate-pulse">
							Unleash Your Mind's Potential
						</span>{" "}
						with Brain Blitz: The
						<span className="text-red-400 animate-pulse">
							{" "}
							Ultimate
						</span>{" "}
						Quiz Experience!
					</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-full">
					<button className="btn btn-primary" onClick={performSignIn}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}
