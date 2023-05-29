import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
            <div className="center" style={{ marginBottom: "30px" }}>
                <h1 className="text-5xl font-bold">Dashboard</h1>
            </div>

            <div className="btn-group button-group">
                <button className="btn join">Join Quiz</button>
                <button className="btn create">Create Quiz</button>
            </div>

            {/* <button className="btn w-64 al" onClick={performSignOut}>
                Log out
            </button> */}
        </div>
    );
}
