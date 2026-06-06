class ApiRequests {
    constructor() {
        this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/";
    }

    getHeaders() {
        return {
            "Content-Type":
                "application/json"
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
            throw new Error(
                data?.detail ||
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