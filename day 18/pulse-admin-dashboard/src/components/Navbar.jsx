import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import SearchBar from './SearchBar';

const Navbar = ({ toggleSidebar, searchValue, onSearchChange }) => {
  const location = useLocation();

  // Resolve Title based on Route Path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Overview';
      case '/users':
        return 'Team Members';
      case '/products':
        return 'Catalog';
      case '/analytics':
        return 'Performance';
      case '/settings':
        return 'Preferences';
      default:
        return 'Pulse';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FiMenu />
        </button>
        <h1 className="navbar-title">{getPageTitle()}</h1>
      </div>

      <div className="navbar-right">
        {/* Only show navbar search if path supports page-level client filtering */}
        {(location.pathname === '/users' || location.pathname === '/products') && (
          <div className="navbar-search animate-fade-in">
            <SearchBar 
              value={searchValue} 
              onChange={onSearchChange} 
              placeholder={`Search ${location.pathname === '/users' ? 'users...' : 'products...'}`}
            />
          </div>
        )}

        <div className="navbar-actions">
          <button className="navbar-btn" aria-label="Notifications">
            <FiBell />
            <span className="btn-badge" />
          </button>

          <div className="navbar-profile">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="User profile" 
              className="navbar-profile-img"
            />
            <span className="navbar-profile-name">Arhan B.</span>
            <FiChevronDown style={{ fontSize: '12px', color: 'var(--text-muted)' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
