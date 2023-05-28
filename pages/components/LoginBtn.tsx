import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
	const session = useSession();
	const data = session.data;

	if (data) {
		return (
			<>
				Signed in as {data.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button className="btn" onClick={() => signIn()}>
				Sign in
			</button>
			<div>{session.status}</div>
		</>
	);
}
