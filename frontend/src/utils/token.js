import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "gaia_access_token";
const REFRESH_TOKEN_KEY = "gaia_refresh_token";

export function saveTokens({
    access_token,
    refresh_token,
}) {
    if (access_token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    }

    if (refresh_token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    }
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isTokenExpired(token) {

    try {

        const decoded =
            jwtDecode(token);

        const currentTime =
            Date.now() / 1000;

        return decoded.exp < currentTime;

    } catch {

        return true;

    }
}
