import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = existingUsers.find((u) => u.email === email);
    if (alreadyExists) {
      throw new Error("Email already registered. Try logging in.");
    }

    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const sessionUser = { name, email };
    localStorage.setItem("authUser", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = { name: foundUser.name, email: foundUser.email };
    localStorage.setItem("authUser", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
