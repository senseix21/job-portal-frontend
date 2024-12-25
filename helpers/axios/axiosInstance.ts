
import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/lib/localStorage";
import axios from "axios";


const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
        config.headers.Authorization = accessToken
    }
    return config;
}, function (error) {
    // Do something with response error
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response Error:", error.response.status, error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error("Request Error:", error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
    }
    return Promise.reject(error);
});


export { instance }