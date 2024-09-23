import http from "./index";

export const getMenuList = () => {
	return http.get("/menu");
};