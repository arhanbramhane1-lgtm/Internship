import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import UsersTable from '../components/UsersTable';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import '../styles/users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Connect with search state in layout
  const { searchValue, setSearchValue } = useOutletContext();

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('API server returned a failed status response.');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term (name, username, email, company)
  const filteredUsers = users.filter((user) => {
    const query = searchValue.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="users-container animate-fade-in">
      <div className="users-header-actions">
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800' }}>
            Pulse Team Directory
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Manage permission settings, verify company credentials, and view corporate contacts.
          </p>
        </div>

        {/* Display inline search bar on mobile (where the navbar search is hidden) */}
        <div className="users-search-wrapper mobile-only-search">
          <SearchBar 
            value={searchValue} 
            onChange={setSearchValue} 
            placeholder="Filter by name, email or firm..." 
          />
        </div>
      </div>

      {loading ? (
        <Loading type="table" />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchUsers} />
      ) : (
        <UsersTable users={filteredUsers} />
      )}

      {/* Media query overrides in inline stylesheet to toggle desktop search sync display */}
      <style>{`
        .mobile-only-search {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-only-search {
            display: block;
            width: 100%;
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Users;
