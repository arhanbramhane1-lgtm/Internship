import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="avatar-circle">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h1>Welcome, {user?.name} 👋</h1>
        <p>{user?.email}</p>
        <p className="welcome-sub">You're securely logged in.</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
