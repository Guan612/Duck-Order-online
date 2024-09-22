import { useEffect, useState } from "react";
import { getMenuListAPI } from "../../api/menu";
import { menuType } from "../../dto/menu";
export default function useGetMenu() {
	const [menuList, setMenuList] = useState([]);

	const getMenuList = async () => {
		const res = await getMenuListAPI();
		setMenuList(res);
	};

	const getNemuTypeName = (typeValue: number): string => {
		return menuType[typeValue] || "未知食物";
	};

	useEffect(() => {
		getMenuList();
	},[]);

	return { getNemuTypeName, getMenuList, menuList };
}
