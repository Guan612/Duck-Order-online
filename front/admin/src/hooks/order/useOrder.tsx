import { useEffect, useState } from "react";
import { orderStatus } from "../../dto/order";
import { getOrderListAPI } from "../../api/order";

export default function useOrder() {
	const [orderList, setOrderList] = useState([]);

	const getOrderList = async () => {
		const res = await getOrderListAPI();
		setOrderList(res);
	};

	const getOrderStatus = (orderStatusValue: number): string => {
		return orderStatus[orderStatusValue] || "未知状态";
	};

	useEffect(() => {
		getOrderList();
	}, []);

	return { orderList, getOrderStatus };
}
