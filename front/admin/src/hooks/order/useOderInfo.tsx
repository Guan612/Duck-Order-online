import { useEffect, useState, useRef } from "react";
import { getOrderListAPI } from "../../api/order";
import { message } from "antd";
import * as echarts from "echarts";
import { orderStatus } from "../../dto/order";

export default function useOrderInfo() {
	const chartRef = useRef(null); // 图表的引用
	const [orders, setOrders] = useState([]); // 存储订单数据
	const [chartInstance, setChartInstance] = useState(null); // ECharts 实例

	// 获取订单列表的 API 调用
	const gethOrders = async () => {
		try {
			const res = await getOrderListAPI(); // 假设返回订单数组
			setOrders(res); // 设置订单数据
		} catch (error) {
			message.error("获取订单数据失败");
		}
	};

	// 处理订单数据
	const processOrderData = (orders: { orderStatus: number }[]) => {
		// 统计订单状态数量
		const orderStatusCounts = orders.reduce((acc, order) => {
			const status = order.orderStatus;
			if (!acc[status]) {
				acc[status] = 0;
			}
			acc[status]++;
			return acc;
		}, {} as Record<number, number>);
	
		// 返回状态与数量映射
		return Object.keys(orderStatusCounts).map((key) => ({
			name: orderStatus[key as unknown as keyof typeof orderStatus], // 利用枚举映射到状态名称
			value: orderStatusCounts[Number(key)], // 对应的订单数量
		}));
	};

	// 初始化 ECharts 实例
	useEffect(() => {
		if (chartRef.current) {
			const chart = echarts.init(chartRef.current);
			setChartInstance(chart);
		}
	}, [chartRef]);

	// 当订单数据或 ECharts 实例发生变化时，更新图表
	useEffect(() => {
		if (chartInstance && orders.length) {
			const chartData = processOrderData(orders);

			const option = {
				title: {
					text: "订单状态统计",
					left: "center",
				},
				tooltip: {
					trigger: "item",
				},
				legend: {
					top: "bottom",
				},
				series: [
					{
						name: "订单状态",
						type: "pie",
						//roseType: 'area',
						radius: "50%",
						data: chartData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			};

			chartInstance.setOption(option);
		}
	}, [chartInstance, orders]);

	// 组件加载时获取订单数据
	useEffect(() => {
		gethOrders();
	}, []);

	return {
		chartRef, // 图表引用，用于 ECharts 初始化
		orders, // 返回订单数据，可以在其他地方使用
	};
}
