import router from "@/router";
import { useUserStore } from "@/stores/userstore";
import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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
        const errorCode = error.response?.data?.statusCode;
        if (errorCode === 401) {
            ElMessage({
                message: "登录已过期，请重新登录",
                type: "error",
            });
            useUserStore().logout();
            router.push("/auth/login");
            return
        }
        ElMessage({
            message: error.response.data.message,
            type: "error",
        });
        return Promise.reject(error);
    }
);

export default http;
