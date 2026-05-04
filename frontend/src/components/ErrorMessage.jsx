import "./ErrorMessage.css";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <span className="error-box__icon">⚠</span>
      <p className="error-box__text">{message}</p>
      {onRetry && (
        <button className="error-box__btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
