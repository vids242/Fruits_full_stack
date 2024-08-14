import axios from "axios";
import { Base_url } from "./baseURL";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: Base_url,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance