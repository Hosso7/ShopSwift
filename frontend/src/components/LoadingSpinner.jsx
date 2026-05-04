import "./LoadingSpinner.css";

export default function LoadingSpinner({ message = "Loading…" }) {
  return (
    <div className="spinner-wrap" aria-live="polite" aria-busy="true">
      <div className="spinner" />
      <p className="spinner-msg">{message}</p>
    </div>
  );
}
