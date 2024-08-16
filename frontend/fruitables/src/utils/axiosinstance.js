import axios from "axios";
import { Base_url } from "./baseURL";
import Cookies from "js-cookie";
import { logout } from "../redux/slice/authform.slice";

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

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(Base_url + 'users/newtoken', {}, { withCredentials: true })
                
                console.log("axiosInstance newtoken", response);
                
                if (response.status === 200) {
                    const { accessToken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/store').configureStore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
             
            }
        }
      
        return Promise.reject(error);
    }
);

export default axiosInstance