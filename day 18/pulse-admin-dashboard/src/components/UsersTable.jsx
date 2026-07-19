import React from 'react';
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';
import '../styles/users.css';

const UsersTable = ({ users }) => {
  // Generate a premium avatar photo URL using a free placeholder service
  const getAvatarUrl = (id) => {
    // Offset standard images for corporate/professional avatars
    const imgId = (id % 70) + 1;
    return `https://i.pravatar.cc/150?img=${imgId}`;
  };

  if (users.length === 0) {
    return (
      <div 
        className="card" 
        style={{ 
          textAlign: 'center', 
          padding: '60px 24px', 
          color: 'var(--text-secondary)' 
        }}
      >
        <span style={{ fontSize: '15px' }}>
          No matching team members found. Try refining your search query.
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Responsive Table */}
      <div className="table-responsive animate-fade-in">
        <table className="users-table">
          <thead>
            <tr>
              <th>Profile Name</th>
              <th>Email Address</th>
              <th>Organization</th>
              <th>Phone Number</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="table-user-profile">
                    <img 
                      src={getAvatarUrl(user.id)} 
                      alt={user.name} 
                      className="table-user-avatar"
                      onError={(e) => {
                        e.target.style.display = 'none'; // Fallback
                      }}
                    />
                    <div className="table-user-details">
                      <span className="table-user-name">{user.name}</span>
                      <span className="table-user-username">@{user.username.toLowerCase()}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <FiMail style={{ color: 'var(--text-muted)' }} />
                    {user.email.toLowerCase()}
                  </span>
                </td>
                <td>
                  <div className="table-company-name">
                    {user.company.name}
                    <div className="table-company-phrase">{user.company.catchPhrase}</div>
                  </div>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <FiPhone style={{ color: 'var(--text-muted)' }} />
                    {user.phone.split(' ')[0]}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="table-action-btn">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile User Card List */}
      <div className="users-mobile-list animate-fade-in">
        {users.map((user) => (
          <div key={user.id} className="user-mobile-card">
            <div className="user-mobile-header">
              <img 
                src={getAvatarUrl(user.id)} 
                alt={user.name} 
                className="table-user-avatar"
              />
              <div className="table-user-details">
                <span className="table-user-name">{user.name}</span>
                <span className="table-user-username">@{user.username.toLowerCase()}</span>
              </div>
            </div>
            
            <div className="user-mobile-details">
              <div className="user-mobile-row">
                <span className="user-mobile-label">Email:</span>
                <span className="user-mobile-value">{user.email.toLowerCase()}</span>
              </div>
              <div className="user-mobile-row">
                <span className="user-mobile-label">Company:</span>
                <span className="user-mobile-value">{user.company.name}</span>
              </div>
              <div className="user-mobile-row">
                <span className="user-mobile-label">Phone:</span>
                <span className="user-mobile-value">{user.phone.split(' ')[0]}</span>
              </div>
            </div>

            <button 
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 16px'
              }}
            >
              <span>Manage Account</span>
              <FiArrowRight />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersTable;
