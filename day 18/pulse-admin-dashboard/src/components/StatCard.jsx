import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ title, value, icon, trend, duration = 'from last month', theme = 'primary', sparkData = [30, 40, 35, 50, 49, 60, 70, 91] }) => {
  const isPositive = trend >= 0;
  
  // Calculate SVG Sparkline Path
  const width = 120;
  const height = 36;
  const max = Math.max(...sparkData);
  const min = Math.min(...sparkData);
  const range = max - min || 1;
  
  const points = sparkData.map((val, idx) => {
    const x = (idx / (sparkData.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = isPositive ? 'var(--success-color)' : 'var(--danger-color)';

  return (
    <div className="card stat-card animate-slide-up">
      <div className="stat-card-meta">
        <span className="stat-card-title">{title}</span>
        <div className={`stat-card-icon-wrapper stat-card-icon-${theme}`}>
          {icon}
        </div>
      </div>
      
      <div className="stat-card-value">{value}</div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: '12px' }}>
        <div className="stat-card-trend">
          <span className={isPositive ? 'trend-up' : 'trend-down'} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
            {isPositive ? '+' : ''}{trend}%
          </span>
          <span className="stat-card-duration">{duration}</span>
        </div>
        
        {/* SVG Sparkline */}
        <div style={{ width: '80px', height: '24px', opacity: 0.85 }}>
          <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path
              d={`M ${points}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
