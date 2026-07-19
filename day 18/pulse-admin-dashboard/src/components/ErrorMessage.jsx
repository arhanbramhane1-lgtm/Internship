import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div 
      className="card animate-fade-in" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        padding: '48px 24px', 
        gap: '16px', 
        maxWidth: '480px', 
        margin: '40px auto',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        background: 'rgba(239, 68, 68, 0.02)'
      }}
    >
      <div style={{ fontSize: '48px', color: 'var(--danger-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FiAlertTriangle />
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '700' }}>
        Connection Error
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
        {message || 'Unable to retrieve dashboard information. Please verify your connection.'}
      </p>
      {onRetry && (
        <button 
          className="btn-primary" 
          onClick={onRetry} 
          style={{ marginTop: '8px', padding: '8px 20px' }}
        >
          Retry Connection
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
