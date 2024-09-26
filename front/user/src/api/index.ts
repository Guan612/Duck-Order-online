import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
    baseURL: "http://localhost:3000",
    //baseURL: "http://192.168.2.31:3000",
    timeout: 2000,
});

http.interceptors.request.use(
    async (config) => {
        const userStore = useUserStore();
        const token = await userStore.userInfo?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
        ElMessage({
            message: error.response.data.message,
            type: "error",
        });
        return Promise.reject(error);
    }
);

export default http;
