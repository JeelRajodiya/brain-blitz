import { useState } from "react";

function QuizForm() {
    const [showForm, setShowForm] = useState(false);

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

export default QuizForm;
