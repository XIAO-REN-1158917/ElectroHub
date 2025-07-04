import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { ElNotification } from 'element-plus'

const service: AxiosInstance = axios.create({
    baseURL: "http://www.demo.com",
    timeout: 5000
});

// request interceptor
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    return config
}, (error: AxiosError) => {
    ElNotification({
        title: "Error",
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error)
}
)

// response interceptor
service.interceptors.response.use((response: AxiosResponse) => {
    const { code, message } = response.data;
    if (code != 200) {
        ElNotification({
            title: "Error",
            message,
            type: 'error',
        });
        return Promise.reject(new Error(message));
    } else {
        return response.data
    }

}, (error: AxiosError) => {
    ElNotification({
        title: "Error",
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error)
})

export default service