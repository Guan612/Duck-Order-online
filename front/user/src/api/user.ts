import type { LoginInfo } from "@/dto/userInfo";
import http from "./index";

export const loginAPI = (data: LoginInfo) => {
    return http.post("/user/login", data);
};

export const registerAPI = (data: LoginInfo) => {
    return http.post("/user/register", data);
};
