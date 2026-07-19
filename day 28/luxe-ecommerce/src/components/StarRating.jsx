export default function StarRating({ rate = 0, count }) {
  const full = Math.round(rate);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < full ? "text-gold" : "text-line"}>
            ★
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </div>
  );
}
