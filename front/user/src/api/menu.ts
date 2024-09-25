import http from "./index";

export const getMenuListAPI = () => {
	return http.get("/menu");
};

export const searchMenuAPI = (menuName: string) => {
	return http.get(`/menu/search/${menuName}`);
};

export const searchMenuByTypeAPI = (type: number[]) => {
	return http.get("/menu/searchType/", { params: { menuType: type } });
};

export const getMenuByIdAPI = (id: string) => {
	return http.patch(`/menu/${id}`);
};
