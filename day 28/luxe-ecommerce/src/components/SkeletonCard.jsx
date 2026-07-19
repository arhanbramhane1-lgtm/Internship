export default function SkeletonCard() {
  return (
    <div className="card-surface animate-pulse">
      <div className="aspect-[4/5] bg-surface2" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-surface2" />
        <div className="h-4 w-4/5 bg-surface2" />
        <div className="h-4 w-1/4 bg-surface2" />
      </div>
    </div>
  );
}
