import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingBag, FiBarChart2, FiSettings, FiActivity, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome /> },
    { name: 'Users', path: '/users', icon: <FiUsers /> },
    { name: 'Products', path: '/products', icon: <FiShoppingBag /> },
    { name: 'Analytics', path: '/analytics', icon: <FiBarChart2 /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <FiActivity />
          </div>
          <span className="logo-text">Pulse<span className="logo-dot">.</span></span>
          
          {/* Close button on mobile view */}
          <button 
            onClick={toggleSidebar}
            style={{
              marginLeft: 'auto',
              display: 'none',
              fontSize: '20px',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
            className="sidebar-close-btn"
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                // Auto close sidebar on mobile navigation
                if (window.innerWidth <= 1024) {
                  toggleSidebar();
                }
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="User avatar" 
            className="sidebar-avatar"
          />
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">Arhan Bramhane</span>
            <span className="sidebar-user-role">SaaS Architect</span>
          </div>
        </div>
      </aside>
      
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 95,
          }}
        />
      )}
      
      {/* Injecting CSS rules for close btn display state based on media query */}
      <style>{`
        @media (max-width: 1024px) {
          .sidebar-close-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
