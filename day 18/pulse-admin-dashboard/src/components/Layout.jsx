import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

// Styling imports
import '../styles/global.css';
import '../styles/sidebar.css';
import '../styles/navbar.css';
import '../styles/footer.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Reset page search filter when changing routes
  useEffect(() => {
    setSearchValue('');
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div 
      style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        width: '100vw', 
        backgroundColor: 'var(--bg-color)',
        overflowX: 'hidden'
      }}
    >
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1, 
          marginLeft: 'var(--sidebar-width)',
          minWidth: 0,
          transition: 'margin-left var(--transition-normal)'
        }} 
        className="main-layout"
      >
        <Navbar 
          toggleSidebar={toggleSidebar} 
          searchValue={searchValue} 
          onSearchChange={setSearchValue} 
        />
        
        <main 
          style={{ 
            flex: 1, 
            padding: '100px 32px 32px 32px',
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
          }}
          className="page-main animate-fade-in"
        >
          <Outlet context={{ searchValue, setSearchValue }} />
        </main>
        
        <Footer />
      </div>
      
      {/* Media query overrides in inline stylesheet */}
      <style>{`
        @media (max-width: 1024px) {
          .main-layout {
            margin-left: 0 !important;
          }
          .page-main {
            padding: 92px 16px 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
