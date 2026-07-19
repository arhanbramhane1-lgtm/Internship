import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      <button className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

export default ErrorMessage;
