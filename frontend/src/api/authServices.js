import api from "./requests";
import { saveTokens } from "../utils/token";

export async function login(
    email,
    password
) {
    const data = await api.postData(
        "/auth/login",
        {
            email,
            senha: password,
        }
    );

    saveTokens(data);

    return data;
}

export async function register(
    username,
    email,
    password
) {
    return api.postData(
        "/auth/register",
        {
            username,
            email,
            password,
        }
    );
}

export async function me() {
    return api.getData(
        "/auth/me"
    );
}
