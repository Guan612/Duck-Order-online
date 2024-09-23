import { user, RegisterDto } from "../dto/user";
import http from "./index";

export const registerAPI = (userInfo: RegisterDto) => {
	return http.post("/user/register", userInfo);
};

export const loginAPI = (userInfo: user) => {
	return http.post("/user/login", userInfo);
};

export const adminLoginAPI = (userInfo: user) => {
	return http.post("/user/adminLogin", userInfo);
};

export const changePasswordAPI = (userInfo: any) => {
	return http.post("/user/changepwd", userInfo);
};

export const getUserHanderImgAPI = () => {
	return http.get("/user/gethaderimg");
};

export const getAllUserAPI = () => {
	return http.get("/user/");
};

export const updateUserAPI = (userId: string, userInfo: any) => {
	return http.patch(`/user/${userId}`, userInfo);
};

export const deleteUserAPI = (userId: string) => {
	return http.delete(`/user/${userId}`);
};
