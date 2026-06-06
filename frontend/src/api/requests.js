import { getAccessToken } from "../utils/token";

class ApiRequests {
    constructor() {
        this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/";
    }

    getHeaders() {
        const token = getAccessToken();

        return {
            "Content-Type":
                "application/json",
            ...(token
                ? {
                    Authorization:
                        `Bearer ${token}`,
                }
                : {}),
        };
    }

    async handleResponse(response) {
        const contentType =
            response.headers.get("content-type") || "";

        const data =
            contentType.includes("application/json")
                ? await response.json()
                : null;

        if (!response.ok) {
            const detail =
                Array.isArray(data?.detail)
                    ? data.detail
                        .map((item) => item?.msg || item?.message)
                        .filter(Boolean)
                        .join(", ")
                    : data?.detail;

            throw new Error(
                detail ||
                data?.message ||
                `Erro HTTP ${response.status}`
            );
        }

        return data;
    }

    //GET
    async getData(endpoint, params) {

        try {

            const url =
                new URL(
                    `${this.apiUrl}${endpoint}`
                );

            if (params) {

                Object.keys(params)
                    .forEach(key => {

                        url.searchParams.append(
                            key,
                            params[key]
                        );

                    });
            }

            const response =
                await fetch(url, {
                    headers:
                        this.getHeaders(),
                    credentials:
                        "include"
                });

            return this.handleResponse(response);

        } catch (error) {

            console.error(error);

            throw error;
        }
    }

    //POST
    async postData(endpoint, data) {

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "POST",
                    headers:
                        this.getHeaders(),
                    credentials:
                        "include",
                    body:
                        JSON.stringify(data)
                }
            );

        return this.handleResponse(response);
    }

    async postFormData(endpoint, data) {
        const body = new URLSearchParams();

        Object.entries(data)
            .forEach(([key, value]) => {
                body.append(key, value);
            });

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",
                    },
                    credentials:
                        "include",
                    body:
                        body.toString()
                }
            );

        return this.handleResponse(response);
    }

    //PUT
    async putData(endpoint, data) {

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "PUT",
                    headers:
                        this.getHeaders(),
                    credentials:
                        "include",
                    body:
                        JSON.stringify(data)
                }
            );

        return this.handleResponse(response);
    }
    //DELETE
    async deleteData(endpoint) {

        const response =
            await fetch(
                `${this.apiUrl}${endpoint}`,
                {
                    method: "DELETE",
                    headers:
                        this.getHeaders(),
                    credentials:
                        "include"
                }
            );

        return this.handleResponse(response);
    }
}
const api = new ApiRequests();
export default api;
