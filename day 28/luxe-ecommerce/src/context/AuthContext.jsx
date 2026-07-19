import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

// Note: this is a front-end-only demo auth flow (no real backend).
// Accounts are stored in localStorage for the capstone's purposes.
export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("lume_users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("lume_current_user", null);

  const register = (name, email, password) => {
    if (users.some((u) => u.email === email)) {
      return { ok: false, message: "An account with this email already exists." };
    }
    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    setCurrentUser({ name, email });
    return { ok: true };
  };

  const login = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, message: "Incorrect email or password." };
    setCurrentUser({ name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
