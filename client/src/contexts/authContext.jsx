import { createContext, useState, useEffect } from "react";
import { handleLogout } from "../services/authService.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [showAuthModal, setShowAuthModal] = useState({
    login: false,
    register: false,
  });

  useEffect(() => {
    if (user && user.email) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const logout = () => {
    setUser({});
    handleLogout();
  };

  const hideAuthModal = () => {
    setShowAuthModal({ login: false, register: false });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, showAuthModal, setShowAuthModal, hideAuthModal, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
