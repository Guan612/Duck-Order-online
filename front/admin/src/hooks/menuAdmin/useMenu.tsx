import { useEffect, useState } from "react";
import { Form, message } from "antd";
import {
	getMenuListAPI,
	searchMenuAPI,
	searchMenuByTypeAPI,
	ChangeIsShellAPI,
	updateMenuAPI,
	addMenuAPI,
} from "../../api/menu";
import { menuType, menu } from "../../dto/menu";
export default function useGetMenu() {
	const [updateform] = Form.useForm();
	const [menuList, setMenuList] = useState<menu[]>([]);
	const [menu, setMenu] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentMenu, setCurrentMenu] = useState<menu | null>(null);
	const [addMenu,setAddMenu] = useState({});
	const [isaddMenuModalOpen, setIsaddMenuModalOpen] = useState(false);

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
		if (res.length === 0) {
			message.error("未找到相关菜品");
			return;
		}
		setMenuList(res);
		message.success("搜索成功");
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
		message.success(`菜品${newIsSell === 1 ? "上架" : "下架"}成功`);
	};

	const menuSelectChange = async (value: number[]) => {
		if (value.length === 0) {
			getMenuList();
			return;
		}
		const res = await searchMenuByTypeAPI(value);
		setMenuList(res);
	};

	const openMenuModal = (menu: menu) => {
		setCurrentMenu(menu);
		setIsModalOpen(true);
	};

	const okMenuModal = () => {
		updateform.submit();
	};

	const cancelMenuModal = () => {
		setIsModalOpen(false);
	};

	const onFinishMenuModal = async (values: any) => {
		if (currentMenu) {
			const changeid = currentMenu.id;
			values.price = +values.price;
			const res = await updateMenuAPI(changeid, values);
			if (res) {
				message.success("修改成功");
				getMenuList();
				setIsModalOpen(false);
			}
		}
	};

	const onFinishFailedMenuModal = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const openAddMenuModal = () => {
		setIsaddMenuModalOpen(true);
	}

	const okAddModal = () =>{
		updateform.submit();
	}

	const cancelAddModal = () => {
		setIsaddMenuModalOpen(false);
	};

	const onFinishAddModal = async (value:any)=>{
		value.price = +value.price;
		const res = await addMenuAPI(value);
		if (res) {
			message.success("添加成功");
			getMenuList();
			setIsaddMenuModalOpen(false);
		}
	}

	const colums = [
		{
			title: "菜品名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "菜品类型",
			dataIndex: "type",
			key: "type",
			render: (type: number) => getNemuTypeName(type),
		},
		{
			title: "菜品价格",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "菜品图片",
			dataIndex: "pictureUrl",
			key: "pictureUrl",
		},
		{
			title: "是否在售",
			dataIndex: "isSell",
			key: "isSell",
		},
	];

	const menuOptions = [
		{
			label: "清洁用品",
			value: 0,
		},
		{
			label: "洗化用品",
			value: 1,
		},
		{
			label: "餐具类",
			value: 2,
		},
		{
			label: "水壶类",
			value: 3,
		},
		{
			label: "保洁用品",
			value: 4,
		},
		{
			label:"文具",
			value: 5,
		},
	];

	useEffect(() => {
		getMenuList();
	}, []);

	return {
		getNemuTypeName,
		searchMenu,
		getMenuList,
		changeSell,
		menuSelectChange,
		openMenuModal,
		okMenuModal,
		cancelMenuModal,
		onFinishMenuModal,
		onFinishFailedMenuModal,
		openAddMenuModal,
		onFinishAddModal,
		okAddModal,
		cancelAddModal,
		addMenu,
		currentMenu,
		isModalOpen,
		menuOptions,
		colums,
		menuList,
		menu,
		updateform,
		isaddMenuModalOpen,
	};
}
