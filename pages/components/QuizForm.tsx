import { useState } from "react";

function QuizForm() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            {/* Button Group */}
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

            {/* Create Quiz Form */}
            {showForm && (
                <div className="mainForm fixed inset-0 flex items-center justify-center">
                    <div className="card card-compact w-80 bg-base-200 shadow-xl rounded-lg">
                        <div className="card-header">
                            <div className="form-title">
                                <h2>Create Quiz</h2>
                                <button
                                    className="btn btn-ghost btn-cross"
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
                            <div className="flex flex-col">
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">
                                            Enable Question Jumps
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-accent"
                                            checked
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">
                                            Enable Poll
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-accent"
                                            checked
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">
                                            Enable Difficulty Tags
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-accent"
                                            checked
                                        />
                                    </label>
                                </div>
                            </div>
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

export default QuizForm;
