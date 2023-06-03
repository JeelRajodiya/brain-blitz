export default function Loading() {
  return (
    <span
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "30vh",
        width: "30vw",
      }}
      className="loading loading-infinity loading-lg"
    ></span>
  );
}
