import axios from "axios";
import authService from "./auth-service";

class axiosService {
    axiosInstance = {};

    constructor() {
        this.initInstance();
    }
    // This instance works just like axios, but it allows us to do something before sending the
    // request, in this case, we attach the token to the request header.
    initInstance() {
        this.axiosInstance = axios.create({
            baseURL: "/api/v1",
            timeout: 5000,
        });

        this.axiosInstance.interceptors.request.use(config => {
            const token = authService.getToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
        return this.axiosInstance;
    }

    getInstance() {
        return this.axiosInstance || this.initInstance();
    }
}

export default new axiosService();
