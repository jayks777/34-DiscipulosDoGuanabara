import api from "./requests";

export async function login(
    email,
    password
) {
    return api.postData(
        "/auth/login",
        {
            email,
            password,
        }
    );
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