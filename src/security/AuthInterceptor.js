import axios from 'axios';
import * as SessionUtil from "../util/SessionUtil";

const AuthInterceptor = axios.create();


// Response interceptor
AuthInterceptor.interceptors.response.use(
    (response) => {
        // Modify the response data before resolving the promise
        // You can perform common response handling here
        if (response.data.responseCode === 300) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        } else {
            return response;
        }
    },
    (error) => {
        // Handle response error
        // You can check for specific error codes or perform other actions
        return Promise.reject(error);
    }
);

// Request interceptor
AuthInterceptor.interceptors.request.use(
    (config) => {
        // Modify the request config (headers, etc.) before sending the request
        // You can also add authentication tokens or perform other actions
        if (!config.url.includes("login")) {
            config.headers["authToken"] = SessionUtil.getAuthenticationData().token;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default AuthInterceptor;
