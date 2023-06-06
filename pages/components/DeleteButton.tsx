import React from "react";

const DeleteButton = ({ onClick }) => (
  <button
    className="btn btn-square btn-xs hover:bg-red-600 btnTransparent  rounded-md"
    style={{ scale: "1.5", borderColor: "#FFFFFF33", borderWidth: "1px" }}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default DeleteButton;
