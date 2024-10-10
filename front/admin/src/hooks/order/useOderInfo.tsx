import { useState, useEffect, useRef } from "react";
import { getAllInfoAPI } from "../../api/order";
import { message } from "antd";
import { orderStatus } from "../../dto/order";
import useChart from "../tool/useChart"; // 引入 useChart hook

export default function OrderInfo() {
	const orderChartRef = useRef(null); // 订单状态图表的引用
	const menuChartRef = useRef(null); // 菜品销售图表的引用
	const [orders, setOrders] = useState([]); // 存储订单数据
	const [menuData, setMenuData] = useState([]); // 存储菜品数据
	const [totalPrice, setTotalPrice] = useState(0); // 存储总金额

	// 获取订单数据
	const fetchOrders = async () => {
		try {
			const res = await getAllInfoAPI();
			setOrders(res);
		} catch (error) {
			message.error("获取订单数据失败");
		}
	};

	// 处理订单状态数据
	const processOrderData = (orders) => {
		const orderStatusCounts = orders.reduce((acc, order) => {
			acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
			return acc;
		}, {});

		return Object.entries(orderStatusCounts).map(([key, value]) => ({
			name: orderStatus[key], // 映射状态名
			value,
		}));
	};

	// 处理菜品销售数据
	const processMenuData = (orders) => {
		const menuCounts = orders.reduce((acc, order) => {
			order.orderList.forEach((item) => {
				const menuName = item.menu.name;
				acc[menuName] = (acc[menuName] || 0) + item.quantity;
			});
			return acc;
		}, {});

		return Object.entries(menuCounts).map(([name, quantity]) => ({
			name,
			quantity,
		}));
	};

	//计算总金额
	const calculateTotalPrice = (orders: any[]) => {
		const totalPrice = orders.reduce((acc, order) => {
			return acc + order.totalPrice;
		}, 0);
		setTotalPrice(totalPrice);
	};

	// 初始化数据
	useEffect(() => {
		fetchOrders();
	}, []);

	//实时计算总金额
	useEffect(() => {
		calculateTotalPrice(orders);
	}, [orders]);

	useEffect(() => {
		if (orders.length) {
			const menuSalesData = processMenuData(orders);
			setMenuData(menuSalesData);
		}
	}, [orders]);

	// 使用 useChart 来渲染订单状态图表
	useChart(orderChartRef, orders, (data) => ({
		title: { text: "订单状态统计", left: "center" },
		legend: {
			orient: "vertical",
			left: "left",
			data: processOrderData(data).map((item) => item.name), // 通过映射数据生成图例名称
		},
		tooltip: { trigger: "item" },
		series: [
			{
				name: "订单状态",
				type: "pie",
				radius: "50%",
				data: processOrderData(data),
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			},
		],
	}));

	// 使用 useChart 来渲染菜单销售图表
	useChart(menuChartRef, menuData, (data) => ({
		title: { text: "菜品销售统计", left: "center" },
		xAxis: {
			type: "category",
			data: data.map((item) => item.name),
			axisLabel: { rotate: 30 },
		},
		yAxis: { type: "value" },
		series: [
			{
				name: "销量",
				type: "bar",
				data: data.map((item) => item.quantity),
			},
		],
	}));

	const menuOptions = {
		title: { text: "菜品销售统计", left: "center" },
		xAxis: {
			type: "category",
			data: menuData.map((item) => item.name),
			axisLabel: { rotate: 30 },
		},
		yAxis: { type: "value" },
		series: [
			{
				name: "销量",
				type: "bar",
				data: menuData.map((item) => item.quantity),
			},
		],
	};

	return {
		menuChartRef,
		orderChartRef, // 图表引用，用于 ECharts 初始化
		orders, // 返回订单数据，可以在其他地方使用
		totalPrice,
		menuOptions,
	};
}
