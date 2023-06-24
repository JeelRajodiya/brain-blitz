export default function Timer({
  minutes,
  secondsLeft,
}: {
  minutes: number;
  secondsLeft: number;
}) {
  return (
    <div className="grid grid-flow-col bg-base-100 rounded-xl p-2 gap-2 text-center">
      <span className="countdown font-mono text-2xl">
        <span style={{ "--value": minutes } as React.CSSProperties}></span>m
        <span style={{ "--value": secondsLeft } as React.CSSProperties}></span>s
      </span>
    </div>
  );
}
