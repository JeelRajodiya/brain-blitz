// radial progress:
export default function RadialProgress({
  complete,
  toggleSidebar,
}: {
  complete: number;
  toggleSidebar: () => void;
}) {
  let textColor: string;
  if (complete < 25) {
    textColor = "text-red-500";
  } else if (complete < 50) {
    textColor = "text-yellow-500";
  } else if (complete < 75) {
    textColor = "text-green-500";
  } else if (complete < 100) {
    textColor = "text-primary";
  } else {
    textColor = "text-accent";
  }

  return (
    <div
      className={`radial-progress ml-3 ${textColor}`}
      style={
        {
          "--value": `${complete}`,
          "--size": "3rem",
          "--thickness": "4px",
          cursor: "pointer",
        } as React.CSSProperties
      }
      onClick={toggleSidebar}
    >
      <p
        className="text-xs tooltip tooltip-info tooltip-right"
        data-tip={complete + "% attempted"}
      >
        {complete}%
      </p>
    </div>
  );
}
