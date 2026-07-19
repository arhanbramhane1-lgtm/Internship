export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="loader-ring" />
      <p>{label}…</p>
    </div>
  );
}
