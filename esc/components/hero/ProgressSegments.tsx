export default function ProgressSegments({
  active,
  total,
}: {
  active: number;
  total: number;
}) {
  return (
    <div
      className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-10"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={active + 1}
      aria-label="Story progress"
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1 w-8 rounded-xs transition-colors duration-base ease-standard ${
            i === active ? "bg-esc-orange" : "bg-dt-100"
          }`}
        />
      ))}
    </div>
  );
}
