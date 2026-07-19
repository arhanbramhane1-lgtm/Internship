import React from 'react';

const Loading = ({ type = 'spinner' }) => {
  if (type === 'table') {
    return (
      <div className="table-responsive animate-fade-in" style={{ opacity: 0.7 }}>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Skeleton Header */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ height: '24px', width: '25%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
            <div style={{ height: '24px', width: '20%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
            <div style={{ height: '24px', width: '30%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
            <div style={{ height: '24px', width: '25%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
          {/* Skeleton Rows */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ height: '36px', width: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{ height: '14px', width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                <div style={{ height: '10px', width: '20%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}></div>
              </div>
              <div style={{ height: '16px', width: '20%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }}></div>
              <div style={{ height: '16px', width: '15%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="products-grid animate-fade-in" style={{ opacity: 0.7 }}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={item} 
            className="card" 
            style={{ 
              height: '380px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              padding: '20px' 
            }}
          >
            <div style={{ height: '180px', width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}></div>
            <div style={{ height: '18px', width: '80%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
            <div style={{ height: '12px', width: '50%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <div style={{ height: '24px', width: '30%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
              <div style={{ height: '32px', width: '35%', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default Circular Spinner
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '60px 0', 
        flexDirection: 'column',
        gap: '16px' 
      }}
    >
      <div 
        style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          border: '3px solid rgba(255, 255, 255, 0.05)', 
          borderTopColor: 'var(--primary-color)', 
          animation: 'spin 1s linear infinite' 
        }} 
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
        Synchronizing...
      </span>
    </div>
  );
};

export default Loading;
