import React, { useState } from 'react';
import { FiTrendingUp, FiArrowDownRight, FiFileText, FiDownload, FiDollarSign, FiUsers, FiShoppingBag, FiActivity } from 'react-icons/fi';
import '../styles/analytics.css';
import '../styles/cards.css';

const Analytics = () => {
  // Chart Hover Tooltip States
  const [lineTooltip, setLineTooltip] = useState(null);
  const [barTooltip, setBarTooltip] = useState(null);
  const [donutTooltip, setDonutTooltip] = useState(null);

  // 1. Line Chart Data (Monthly Revenue & Visitors)
  const lineData = [
    { month: 'Jan', revenue: 14200, visitors: 3200 },
    { month: 'Feb', revenue: 18500, visitors: 4100 },
    { month: 'Mar', revenue: 16800, visitors: 3900 },
    { month: 'Apr', revenue: 24300, visitors: 5800 },
    { month: 'May', revenue: 21900, visitors: 5100 },
    { month: 'Jun', revenue: 31200, visitors: 7200 },
    { month: 'Jul', revenue: 28900, visitors: 6800 }
  ];

  // Coordinates Mapping for SVG Line Chart (width: 600, height: 220)
  const maxRevenue = Math.max(...lineData.map(d => d.revenue));
  const maxVisitors = Math.max(...lineData.map(d => d.visitors));
  
  const getLineCoordinates = (key, maxVal) => {
    return lineData.map((d, index) => {
      const x = 50 + (index * 80);
      const y = 180 - ((d[key] / maxVal) * 140);
      return { x, y, val: d[key], label: d.month };
    });
  };

  const revenuePoints = getLineCoordinates('revenue', maxRevenue);
  const visitorsPoints = getLineCoordinates('visitors', maxVisitors);

  const getSvgPath = (points) => {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  // 2. Bar Chart Data (Orders Count)
  const barData = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 62 },
    { label: 'Wed', value: 58 },
    { label: 'Thu', value: 84 },
    { label: 'Fri', value: 92 },
    { label: 'Sat', value: 70 },
    { label: 'Sun', value: 50 }
  ];
  
  const maxBarVal = Math.max(...barData.map(d => d.value));

  // 3. Donut Chart Data (Traffic Distribution)
  const donutData = [
    { name: 'Organic Search', value: 45, color: '#3B82F6', offset: 0 },
    { name: 'Direct Traffic', value: 25, color: '#22C55E', offset: 45 },
    { name: 'Social Media', value: 18, color: '#F59E0B', offset: 70 },
    { name: 'Referrals', value: 12, color: '#EF4444', offset: 88 }
  ];
  
  // Donut Circle Math (Radius: 70, Circumference: 440)
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // 439.8

  return (
    <div className="analytics-container animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800' }}>
          Pulse Insights Portal
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Monitor business performance, audit customer conversion funnels, and generate reports.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <section className="analytics-kpi-grid">
        {/* Revenue Metric */}
        <div className="card stat-card">
          <div className="stat-card-meta">
            <span className="stat-card-title">Net Revenue</span>
            <div className="stat-card-icon-wrapper stat-card-icon-success">
              <FiDollarSign />
            </div>
          </div>
          <div className="stat-card-value">$156,240</div>
          <div className="stat-card-trend">
            <span className="trend-up" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiTrendingUp /> +14.2%
            </span>
            <span className="stat-card-duration">since last quarter</span>
          </div>
        </div>

        {/* Visitors Metric */}
        <div className="card stat-card">
          <div className="stat-card-meta">
            <span className="stat-card-title">Unique Visitors</span>
            <div className="stat-card-icon-wrapper stat-card-icon-primary">
              <FiUsers />
            </div>
          </div>
          <div className="stat-card-value">36,100</div>
          <div className="stat-card-trend">
            <span className="trend-up" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiTrendingUp /> +8.6%
            </span>
            <span className="stat-card-duration">since last quarter</span>
          </div>
        </div>

        {/* Orders Metric */}
        <div className="card stat-card">
          <div className="stat-card-meta">
            <span className="stat-card-title">SaaS Orders</span>
            <div className="stat-card-icon-wrapper stat-card-icon-warning">
              <FiShoppingBag />
            </div>
          </div>
          <div className="stat-card-value">4,120</div>
          <div className="stat-card-trend">
            <span className="trend-down" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiArrowDownRight /> -2.4%
            </span>
            <span className="stat-card-duration">since last quarter</span>
          </div>
        </div>

        {/* Conversion Rate Metric */}
        <div className="card stat-card">
          <div className="stat-card-meta">
            <span className="stat-card-title">Conversion Rate</span>
            <div className="stat-card-icon-wrapper stat-card-icon-danger">
              <FiActivity />
            </div>
          </div>
          <div className="stat-card-value">2.48%</div>
          <div className="stat-card-trend">
            <span className="trend-up" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiTrendingUp /> +0.65%
            </span>
            <span className="stat-card-duration">since last quarter</span>
          </div>
        </div>
      </section>

      {/* Analytics Charts Grid */}
      <section className="analytics-charts-grid">
        {/* Revenue vs Visitors Line Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Revenue & Traffic Trends</h3>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></span>
                Revenue ($)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }}></span>
                Visitors
              </span>
            </div>
          </div>

          <div className="chart-container">
            <svg className="svg-chart" viewBox="0 0 600 220">
              {/* Gradients */}
              <defs>
                <linearGradient id="areaGradientBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="areaGradientGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--success-color)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--success-color)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 75, 110, 145, 180].map((yVal, i) => (
                <line key={i} className="chart-grid-line" x1="50" y1={yVal} x2="530" y2={yVal} />
              ))}

              {/* Chart Areas */}
              <path d={`${getSvgPath(revenuePoints)} L 530 180 L 50 180 Z`} className="chart-area chart-area-blue" />
              <path d={`${getSvgPath(visitorsPoints)} L 530 180 L 50 180 Z`} className="chart-area chart-area-green" />

              {/* Chart Lines */}
              <path d={getSvgPath(revenuePoints)} className="chart-line chart-line-blue" />
              <path d={getSvgPath(visitorsPoints)} className="chart-line chart-line-green" />

              {/* Axis Labels */}
              {lineData.map((d, index) => (
                <text key={index} className="chart-axis-text" x={50 + (index * 80)} y="205" textAnchor="middle">
                  {d.month}
                </text>
              ))}

              {/* Interactive Dots Layer */}
              {revenuePoints.map((p, index) => (
                <g key={`rev-dots-${index}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    className="chart-point chart-point-blue"
                    onMouseEnter={() => {
                      setLineTooltip({
                        x: p.x,
                        y: p.y,
                        label: `Revenue (${p.label})`,
                        value: `$${p.val.toLocaleString()}`
                      });
                    }}
                    onMouseLeave={() => setLineTooltip(null)}
                  />
                  <circle
                    cx={visitorsPoints[index].x}
                    cy={visitorsPoints[index].y}
                    r="4"
                    className="chart-point chart-point-green"
                    onMouseEnter={() => {
                      setLineTooltip({
                        x: visitorsPoints[index].x,
                        y: visitorsPoints[index].y,
                        label: `Visitors (${visitorsPoints[index].label})`,
                        value: `${visitorsPoints[index].val.toLocaleString()}`
                      });
                    }}
                    onMouseLeave={() => setLineTooltip(null)}
                  />
                </g>
              ))}
            </svg>

            {/* Custom Tooltip */}
            {lineTooltip && (
              <div 
                className="chart-tooltip" 
                style={{ 
                  left: `${(lineTooltip.x / 600) * 100}%`, 
                  top: `${(lineTooltip.y / 220) * 100}%`,
                  opacity: 1
                }}
              >
                <span className="tooltip-title">{lineTooltip.label}</span>
                <span className="tooltip-value">{lineTooltip.value}</span>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Orders Bar Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Orders Volume</h3>
          </div>

          <div className="chart-container">
            <svg className="svg-chart" viewBox="0 0 500 220">
              {/* Grid Lines */}
              {[40, 75, 110, 145, 180].map((yVal, i) => (
                <line key={i} className="chart-grid-line" x1="40" y1={yVal} x2="460" y2={yVal} />
              ))}

              {/* Bars rendering */}
              {barData.map((d, index) => {
                const barWidth = 32;
                const x = 55 + (index * 55);
                const barHeight = (d.value / maxBarVal) * 140;
                const y = 180 - barHeight;
                
                return (
                  <rect
                    key={index}
                    x={x - (barWidth / 2)}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    className="chart-bar chart-bar-blue"
                    onMouseEnter={() => {
                      setBarTooltip({
                        x: x,
                        y: y,
                        label: d.label,
                        value: `${d.value} orders`
                      });
                    }}
                    onMouseLeave={() => setBarTooltip(null)}
                  />
                );
              })}

              {/* Axis text */}
              {barData.map((d, index) => (
                <text key={index} className="chart-axis-text" x={55 + (index * 55)} y="205" textAnchor="middle">
                  {d.label}
                </text>
              ))}
            </svg>

            {/* Custom Tooltip */}
            {barTooltip && (
              <div 
                className="chart-tooltip" 
                style={{ 
                  left: `${(barTooltip.x / 500) * 100}%`, 
                  top: `${(barTooltip.y / 220) * 100}%`,
                  opacity: 1
                }}
              >
                <span className="tooltip-title">{barTooltip.label}</span>
                <span className="tooltip-value">{barTooltip.value}</span>
              </div>
            )}
          </div>
        </div>

        {/* Traffic Source Donut Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Traffic Inbound Breakdown</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center', height: '220px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <svg className="donut-svg" width="180" height="180" viewBox="0 0 180 180">
                <circle className="donut-ring" cx="90" cy="90" r={radius} />
                
                {/* Segments Mapping */}
                {donutData.map((d, idx) => {
                  const dashArray = `${(d.value / 100) * circumference} ${circumference}`;
                  const dashOffset = circumference - ((d.offset / 100) * circumference);
                  
                  return (
                    <circle
                      key={idx}
                      className={`donut-segment donut-segment-${idx === 0 ? 'blue' : idx === 1 ? 'green' : idx === 2 ? 'warning' : 'danger'}`}
                      cx="90"
                      cy="90"
                      r={radius}
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                      onMouseEnter={() => {
                        setDonutTooltip({
                          label: d.name,
                          value: `${d.value}% Share`
                        });
                      }}
                      onMouseLeave={() => setDonutTooltip(null)}
                    />
                  );
                })}
                
                {/* Mid Hole Details */}
                <text className="donut-center-text" x="90" y="90" transform="rotate(90 90 90)">
                  {donutTooltip ? (
                    <>
                      <tspan x="90" dy="-6" style={{ fontSize: '15px', fontWeight: 'bold' }}>{donutTooltip.value}</tspan>
                      <tspan x="90" dy="20" style={{ fontSize: '10px', fill: 'var(--text-secondary)' }}>{donutTooltip.label.split(' ')[0]}</tspan>
                    </>
                  ) : (
                    <>
                      <tspan x="90" dy="-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>36.1K</tspan>
                      <tspan x="90" dy="18" style={{ fontSize: '11px', fill: 'var(--text-secondary)' }}>Visits</tspan>
                    </>
                  )}
                </text>
              </svg>
            </div>

            {/* Labels Details list */}
            <div className="donut-labels">
              {donutData.map((item, idx) => (
                <div key={idx} className="donut-label-item">
                  <div className="donut-label-left">
                    <div className="donut-dot" style={{ backgroundColor: item.color }} />
                    <span className="donut-label-name">{item.name}</span>
                  </div>
                  <span className="donut-label-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funnel Metrics Detail Log */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Conversion Funnel Drop-off</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {[
              { step: '1. Landing Page Sessions', value: '36,100', pct: 100, color: 'var(--primary-color)' },
              { step: '2. Product Clicks / Searches', value: '18,500', pct: 51, color: '#4F46E5' },
              { step: '3. Cart Additions', value: '7,800', pct: 21, color: 'var(--warning-color)' },
              { step: '4. Completed Checkouts', value: '4,120', pct: 11, color: 'var(--success-color)' }
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ fontWeight: 500 }}>{step.step}</span>
                  <span style={{ fontWeight: 'bold' }}>{step.value} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>({step.pct}%)</span></span>
                </div>
                {/* Custom Progress Bar */}
                <div style={{ width: '100%', height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
                  <div style={{ width: `${step.pct}%`, height: '100%', backgroundColor: step.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reports / Export Section */}
      <section className="reports-section">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700' }}>
          Generated Audit Reports
        </h3>
        
        <div className="reports-list">
          {[
            { name: 'Monthly_Revenue_Statement_June.pdf', size: '2.4 MB', date: 'Jul 01, 2026' },
            { name: 'Stripe_Transactions_Q2_Audit.csv', size: '12.8 MB', date: 'Jun 30, 2026' },
            { name: 'Traffic_Inbound_Analytics_June.pdf', size: '1.8 MB', date: 'Jun 28, 2026' }
          ].map((report, idx) => (
            <div key={idx} className="report-item">
              <div className="report-meta">
                <div className="report-icon-wrapper">
                  <FiFileText />
                </div>
                <div className="report-info">
                  <span className="report-name">{report.name}</span>
                  <span className="report-size-date">{report.size} • Created {report.date}</span>
                </div>
              </div>
              <button 
                className="report-download-btn"
                onClick={() => alert(`Downloading ${report.name}...`)}
                title="Download Document"
              >
                <FiDownload />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Analytics;
