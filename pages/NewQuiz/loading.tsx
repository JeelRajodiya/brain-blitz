import * as React from "react";

export default function Loading() {
  return (
    <div>
      <span
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20rem", // Adjust the width to make the circle larger
        }}
        className="loading loading-ring loading-lg"
      ></span>
      <span
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "10rem", // Adjust the width to make the circle larger
        }}
        className="loading loading-infinity loading-lg"
      ></span>
    </div>
  );
}
