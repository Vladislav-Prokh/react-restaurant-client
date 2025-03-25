import axios from "axios";
import {userManager} from "./config/auth.config";


const interceptor = axios.create({
    baseURL: "http://localhost:8081",
});


interceptor.interceptors.request.use(async (config) => {
    const user = await userManager.getUser();
    if (user && user.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default interceptor;
