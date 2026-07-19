import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <FiSearch 
        style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-muted)',
          fontSize: '18px',
          pointerEvents: 'none'
        }} 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 16px 10px 42px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          transition: 'all var(--transition-fast)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary-color)';
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
          e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-color)';
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          e.target.style.boxShadow = 'none';
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            borderRadius: '50%',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
