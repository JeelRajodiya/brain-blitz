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
        <div>
            <h1>Landing Page</h1>
            <button className="btn" onClick={performSignIn}>
                Login
            </button>
        </div>
    );
}
