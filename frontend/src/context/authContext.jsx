import { useState, useEffect } from "react";

import api from "../api/requests";
import { AuthContext } from "./auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const data = await api.getData("/auth/me");

      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function validateAuth() {
      try {
        const user = await api.getData("/auth/me");

        setUser(user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    validateAuth();
  }, []);

  const login = async () => {
    await loadUser();
  };

  const logout = async () => {
    try {
      await api.postData("/auth/logout", {});
    } catch {
      // Mesmo se o servidor falhar, limpamos o estado local da sessão.
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}