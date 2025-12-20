import React, { createContext, useState, useEffect, useCallback } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 Load current user from token
  const loadMe = useCallback(async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await authApi.getMe();
      setUser(res.data?.user || null);
      setError(null);
    } catch (err) {
      console.error("Failed to load current user:", err);
      setUser(null);
      localStorage.removeItem("auth_token");
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 Initial load + listen for login/logout token changes
  useEffect(() => {
    loadMe();

    const handler = () => loadMe();
    window.addEventListener("auth-token-updated", handler);

    return () => {
      window.removeEventListener("auth-token-updated", handler);
    };
  }, [loadMe]);


  const value = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    refreshUser: loadMe, // 👈 optional helper
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
