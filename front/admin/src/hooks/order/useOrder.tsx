import { useEffect, useState } from "react";
import { orderStatus } from "../../dto/order";
import {
	getOrderListAPI,
	getOrderDetaiListAPI,
	selectOrderStatusAPI,
} from "../../api/order";
import { message } from "antd";

export default function useOrder() {
	const [orderList, setOrderList] = useState([]);
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [orderDetail, setOrderDetail] = useState([]);

	const getOrderList = async () => {
		const res = await getOrderListAPI();
		setOrderList(res);
	};

	const getOrderStatus = (orderStatusValue: number): string => {
		return orderStatus[orderStatusValue] || "未知状态";
	};

	const showOrderModal = async (orderId: string) => {
		const res = await getOrderDetaiListAPI(orderId);
		setOrderDetail(res);
		setIsOrderModalOpen(true);
	};

	const handOrderleOk = () => {
		setIsOrderModalOpen(false);
	};

	const handOrderleCancel = () => {
		setIsOrderModalOpen(false);
	};

	const orderSelectChange = async (value: number[]) => {
		if (value.length === 0) {
			getOrderList();
			return;
		}
		const res = await selectOrderStatusAPI(value);
		if (res.length === 0) {
			message.error("没有符合条件的订单");
			return;
		}
		message.success("查询成功");
		setOrderList(res);
	};

	useEffect(() => {
		getOrderList();
	}, []);

	const orderOptions = [
		{
			label: "已创建",
			value: 0,
		},
		{
			label: "待支付",
			value: 1,
		},
		{
			label: "已支付",
			value: 2,
		},
		{
			label: "正在制作",
			value: 3,
		},
		{
			label: "已完成",
			value: 4,
		},
		{
			label: "已取消",
			value: 5,
		},
		{
			label: "正在配送",
			value: 6,
		},
		{
			label: "已送达",
			value: 7,
		},
		{
			label: "已退款",
			value: 8,
		},
		{
			label: "已评价",
			value: 9,
		},
	];

	return {
		orderList,
		orderDetail,
		isOrderModalOpen,
		orderOptions,
		getOrderStatus,
		showOrderModal,
		handOrderleOk,
		handOrderleCancel,
		orderSelectChange,
	};
}
