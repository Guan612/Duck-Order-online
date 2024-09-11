import RegisterDto from "../dto/register";
import userInfoDto from "../dto/userInfo";
import http from "./index";

export const registerAPI = (userInfo: RegisterDto) => {
	return http.post("/user/register", userInfo);
};

export const loginAPI = (userInfo: userInfoDto) => {
	return http.post("/user/login", userInfo);
};

export const changePasswordAPI = (userInfo: any) => {
	return http.post("/user/changepwd", userInfo);
};

export const getUserHanderImgAPI = () => {
	return http.get("/user/gethaderimg");
};
