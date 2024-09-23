import http from "./index";

export const getMenuListAPI = () => {
	return http.get("/menu");
};

export const ChangeIsShellAPI = (id: number, isSell: number) => {
	return http.patch(`/menu/${id}`, {isSell: isSell});
};

export const searchMenuAPI = (menuName: string) => {
	return http.get(`/menu/search/${menuName}`);
}
