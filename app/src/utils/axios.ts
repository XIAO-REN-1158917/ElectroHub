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
    if (response.data.code != 200) {
        ElNotification({
            title: "Error",
            message: response.data.message,
            type: 'error',
        });
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