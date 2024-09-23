import http from "./index";

export const getMenuListAPI = () => {
	return http.get("/menu");
};

export const ChangeIsShellAPI = (id: string, isSell: number) => {
	return http.patch(`/menu/${id}`, {isSell: isSell});
};
