import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Index() {
	const session = useSession();
	const router = useRouter();
	if (session.status == "unauthenticated") {
		router.push("/LandingPage");
	} else if (session.status == "authenticated") {
		router.push("/Dashboard");
	}
}
