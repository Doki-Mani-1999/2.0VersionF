// src/Context/AuthProvider.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", role: "", token: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("decoded in auth"+ decoded);
        const { sub: email, role } = decoded;
        setUser({ email, role, token });
      } catch (err) {
        clearAuth();
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const { sub: email, role } = decoded;
      console.log("decoded" + decoded)
      localStorage.setItem("token", token);
      setUser({ email, role, token });
    } catch (err) {
      clearAuth();
    }
  };

  const logout = () => {
    clearAuth();
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    setUser({ email: "", role: "", token: "" });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated: !!user.token }}>
      {children}
    </AuthContext.Provider>
  );
};