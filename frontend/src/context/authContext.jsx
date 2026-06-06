import { useEffect, useState } from "react";

import api from "../api/requests";
import { AuthContext } from "./auth";
import {
    clearTokens,
    getAccessToken,
    isTokenExpired,
} from "../utils/token";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        const token = getAccessToken();

        if (!token || isTokenExpired(token)) {
            clearTokens();
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const data = await api.getData("/auth/me");

            setUser(data);
        } catch {
            clearTokens();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login() {
        await loadUser();
    }

    async function logout() {
        try {
            await api.postData("/auth/logout", {});
        } catch {
            // Mesmo se o servidor falhar, limpamos o estado local da sessão.
        }

        clearTokens();
        setUser(null);
    }

    useEffect(() => {
        let ignore = false;

        async function validateAuth() {
            const token = getAccessToken();

            if (!token || isTokenExpired(token)) {
                clearTokens();

                if (!ignore) {
                    setUser(null);
                    setLoading(false);
                }

                return;
            }

            try {
                const data = await api.getData("/auth/me");

                if (!ignore) {
                    setUser(data);
                }
            } catch {
                clearTokens();

                if (!ignore) {
                    setUser(null);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        validateAuth();

        return () => {
            ignore = true;
        };
    }, []);

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
