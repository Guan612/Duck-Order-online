import { useEffect, useState } from "react";
import {
	getMenuListAPI,
	searchMenuAPI,
	ChangeIsShellAPI,
} from "../../api/menu";
import { menuType, menu } from "../../dto/menu";
export default function useGetMenu() {
	const [menuList, setMenuList] = useState<menu[]>([]);
	const [menu, setMenu] = useState({});

	const getMenuList = async () => {
		const res = await getMenuListAPI();
		setMenuList(res);
	};

	const getNemuTypeName = (typeValue: number): string => {
		return menuType[typeValue] || "未知食物";
	};

	const searchMenu = async (menuName: string) => {
		if (!menuName) {
			// 如果没有输入内容，则重新获取全部菜单
			getMenuList();
			return;
		}
		const res = await searchMenuAPI(menuName);
		setMenuList(res);
	};

	const changeSell = async (id: number, isSell: number) => {
		const newIsSell = isSell === 1 ? 0 : 1;
		const res = await ChangeIsShellAPI(id, newIsSell);

		// 局部更新 menuList，只更新对应的 menu
		setMenuList((prevMenuList) =>
			prevMenuList.map((menu) =>
				menu.id === id ? { ...menu, isSell: newIsSell } : menu
			)
		);
	};

	useEffect(() => {
		getMenuList();
	}, []);

	return {
		getNemuTypeName,
		searchMenu,
		getMenuList,
		changeSell,
		menuList,
		menu,
	};
}
