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
    nome,
    email,
    senha
) {
    return api.postData(
        "/auth/create_user",
        {
            nome,
            email,
            senha,
        }
    );
}

export async function me() {
    return api.getData(
        "/auth/me"
    );
}
