import { menu } from "../dto/menu";
import http from "./index";

export const getMenuListAPI = () => {
	return http.get("/menu");
};

export const addMenuAPI = (menu: menu) => {
	return http.post("/menu", menu);
}

export const deleteMenuAPI = (id: number) => {
	return http.delete(`/menu/${id}`);
}

export const ChangeIsShellAPI = (id: number, isSell: number) => {
	return http.patch(`/menu/${id}`, { isSell: isSell });
};

export const updateMenuAPI = (id: number, changeValue: any) => {
	return http.patch(`/menu/${id}`, changeValue);
};

export const searchMenuAPI = (menuName: string) => {
	return http.get(`/menu/search/${menuName}`);
};

export const searchMenuByTypeAPI = (type: number[]) => {
	return http.get("/menu/searchType/", { params: { menuType: type } });
};
