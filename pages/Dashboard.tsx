import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

function QuizForm() {
    const [showForm, setShowForm] = useState(true);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div
                className="btn-group button-group"
                style={{ marginTop: "40px" }}
            >
                <button className="btn btn-modified join">Join Quiz</button>
                <button
                    className="btn btn-modified create"
                    onClick={toggleForm}
                >
                    Create Quiz
                </button>
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="card card-compact w-52 bg-base-100 shadow">
                        <div className="card-header">
                            <div className="flex justify-end">
                                <button
                                    className="btn btn-ghost"
                                    onClick={toggleForm}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.293 4.293a1 1 0 010 1.414L11.414 10l3.879 3.879a1 1 0 01-1.414 1.414L10 11.414l-3.879 3.879a1 1 0 01-1.414-1.414L8.586 10 4.707 6.121a1 1 0 011.414-1.414L10 8.586l3.879-3.879a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <h2>Create Quiz</h2>
                            <form>
                                {/* Form inputs and elements go here */}
                            </form>
                            <button
                                className="btn btn-primary btn-block"
                                onClick={toggleForm}
                            >
                                Start Making Quiz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

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
            {/* menu bar */}
            <div className="navbar bg-base-200 shadow-md p-2 mx-2 mb-4">
                <div className="flex-1">
                    {/* heading of the page */}
                    <div className="center">
                        <h1 className="text-5xl font-bold">Dashboard</h1>
                    </div>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        {/* <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                ></svg>
                                <span className="badge badge-sm indicator-item">
                                    8
                                </span>
                            </div>
                        </label> */}
                        {/* <div
                            tabIndex={0}
                            className="mt-3 card card-compact dropdown-content w-52 bg-base-200 shadow-md"
                        >
                            <div className="card-body">
                                <span className="font-bold text-lg">
                                    8 Items
                                </span>
                                <span className="text-info">
                                    Subtotal: $999
                                </span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">
                                        View cart
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            {/* IMAGE ATTRIBUTE */}
                            <div className="w-24 mask mask-squircle">
                                <img src={session.data.user.image} />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-8 p-2 shadow bg-base-200 rounded-box w-52"
                        >
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
                    </div>
                </div>
            </div>

            {/* button group */}
            {/* <div
                className="btn-group button-group"
                style={{ marginTop: "80px" }}
            >
                <button className="btn btn-modified join">Join Quiz</button>
                <button className="btn btn-modified create">
                    Create Quiz
                </button>
            </div> */}

            <QuizForm></QuizForm>

            {/* <button className="btn w-64 al" onClick={performSignOut}>
                Log out
            </button> */}
        </div>
    );
}
