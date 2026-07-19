import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity, FiUserPlus, FiPlusCircle, FiDownload, FiCheckCircle } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/dashboard.css';
import '../styles/cards.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users for the Latest Users section
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve recent members.');
        return res.json();
      })
      .then((data) => {
        setLatestUsers(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleActionClick = (action) => {
    if (action === 'addUser') {
      navigate('/users');
    } else if (action === 'addProduct') {
      navigate('/products');
    } else {
      alert(`Action "${action}" triggered successfully!`);
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Welcome Hero Banner */}
      <section className="welcome-hero animate-slide-up">
        <div className="welcome-hero-content">
          <span className="welcome-badge">Pulse SaaS v1.2.0</span>
          <h2 className="welcome-title">Welcome back, Arhan! 👋</h2>
          <p className="welcome-subtitle">
            Everything is running smoothly. Platform revenue is up 14.8% this week, and server latency is hovering at a healthy 18ms.
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/analytics')}
            style={{ padding: '10px 20px' }}
          >
            View Performance
          </button>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <section className="stat-cards-grid">
        <StatCard
          title="Total Users"
          value="10,245"
          icon={<FiUsers />}
          trend={12.4}
          theme="primary"
          sparkData={[40, 42, 45, 43, 48, 52, 58, 62]}
        />
        <StatCard
          title="Products"
          value="450"
          icon={<FiShoppingBag />}
          trend={3.2}
          theme="warning"
          sparkData={[15, 16, 16, 17, 18, 18, 19, 20]}
        />
        <StatCard
          title="Revenue"
          value="$84,240"
          icon={<FiDollarSign />}
          trend={14.8}
          theme="success"
          sparkData={[120, 150, 140, 180, 170, 210, 190, 240]}
        />
        <StatCard
          title="Growth"
          value="24.3%"
          icon={<FiActivity />}
          trend={-1.5}
          theme="danger"
          sparkData={[2.9, 3.1, 3.0, 2.8, 2.7, 2.5, 2.6, 2.4]}
        />
      </section>

      {/* Dashboard Subgrid */}
      <div className="dashboard-grid">
        {/* Left Side: Recent Activity */}
        <section className="card">
          <div className="card-header">
            <h3 className="card-title">System Activity Log</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Realtime Feed</span>
          </div>

          <div className="activity-list">
            <div className="activity-item animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="activity-icon-wrapper" style={{ color: 'var(--success-color)' }}>
                <FiCheckCircle />
              </div>
              <div className="activity-content">
                <span className="activity-text">
                  New subscriber <strong>James Cooper</strong> upgraded to Premium SaaS.
                </span>
                <span className="activity-time">2 minutes ago</span>
              </div>
            </div>

            <div className="activity-item animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="activity-icon-wrapper" style={{ color: 'var(--primary-color)' }}>
                <FiActivity />
              </div>
              <div className="activity-content">
                <span className="activity-text">
                  Deployment pipeline completed successfully on branch <strong>main</strong>.
                </span>
                <span className="activity-time">45 minutes ago</span>
              </div>
            </div>

            <div className="activity-item animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="activity-icon-wrapper" style={{ color: 'var(--warning-color)' }}>
                <FiDollarSign />
              </div>
              <div className="activity-content">
                <span className="activity-text">
                  Stripe payout of <strong>$14,500.00</strong> was initiated.
                </span>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>

            <div className="activity-item animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="activity-icon-wrapper" style={{ color: 'var(--danger-color)' }}>
                <FiPlusCircle />
              </div>
              <div className="activity-content">
                <span className="activity-text">
                  Product catalog updated: <strong>12 items</strong> modified by editor team.
                </span>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Quick Actions & Latest Signups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Quick Actions Panel */}
          <section className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Tasks</h3>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn" onClick={() => handleActionClick('addUser')}>
                <FiUserPlus />
                <span>Invite User</span>
              </button>
              <button className="quick-action-btn" onClick={() => handleActionClick('addProduct')}>
                <FiPlusCircle />
                <span>Add Product</span>
              </button>
              <button className="quick-action-btn" onClick={() => handleActionClick('export')}>
                <FiDownload />
                <span>Export CSV</span>
              </button>
              <button className="quick-action-btn" onClick={() => handleActionClick('status')}>
                <FiActivity style={{ color: 'var(--success-color)' }} />
                <span>Platform OK</span>
              </button>
            </div>
          </section>

          {/* Latest Users Panel */}
          <section className="card">
            <div className="card-header">
              <h3 className="card-title">Latest Team Signups</h3>
            </div>
            
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <div className="latest-users-list">
                {latestUsers.map((user, idx) => (
                  <div key={user.id} className="latest-user-item">
                    <div className="latest-user-profile">
                      <img 
                        src={`https://i.pravatar.cc/150?img=${(user.id % 70) + 1}`} 
                        alt={user.name} 
                        className="latest-user-avatar"
                      />
                      <div className="latest-user-info">
                        <span className="latest-user-name">{user.name}</span>
                        <span className="latest-user-email">@{user.username.toLowerCase()}</span>
                      </div>
                    </div>
                    <span 
                      className={`badge badge-${idx % 2 === 0 ? 'info' : 'success'} latest-user-badge`}
                    >
                      {idx % 2 === 0 ? 'Developer' : 'Support'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
