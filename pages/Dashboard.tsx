import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import QuizForm from "./components/QuizForm";

export default function Dashboard() {
    const session = useSession();
    const router = useRouter();

    if (session.status == "unauthenticated") {
        return router.push("/LandingPage");
    }
    const performSignOut = () => {
        signOut({ callbackUrl: "/LandingPage" });
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="flex justify-center flex-col center">
            {/* menu bar */}
            <div className="navbar bg-base-200 shadow-md p-2 mx-2 mb-4">
                <div className="flex-1">
                    {/* heading of the page */}
                    <div className="center">
                        <h1 className="text-5xl font-bold">Dashboard</h1>
                    </div>
                </div>
                <div className="flex-none">
                    <div
                        className={`dropdown dropdown-end ${
                            showDropdown ? "dropdown-active" : ""
                        }`}
                    >
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                            onClick={toggleDropdown}
                        >
                            {/* IMAGE ATTRIBUTE */}
                            <div className="w-24 mask mask-squircle">
                                {session.data && session.data.user.image && (
                                    <img
                                        src={session.data.user.image}
                                        alt="User Avatar"
                                    />
                                )}
                            </div>
                        </label>
                        {showDropdown && (
                            <ul className="menu menu-compact dropdown-content mt-8 p-2 shadow bg-base-200 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li onClick={performSignOut}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <QuizForm></QuizForm>
        </div>
    );
}
