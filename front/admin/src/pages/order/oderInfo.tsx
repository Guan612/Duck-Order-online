import { Button, message } from "antd";

import useOderInfo from "../../hooks/order/useOderInfo";
export default function OrderInfo() {
	const { orderMessage, orderList } = useOderInfo();

	return (
		<div className="flex flex-col m-2">
			<h1 className="text-2xl font-bold mb-2 text-center">订单信息</h1>
			<p className="text-red-500 mb-2">{orderMessage}</p>
			{orderList &&
				orderList.map((item) => (
					<div key={item.id} className="flex flex-row items-center">
						<p className="mx-1">{item.name}</p>
						<p className="mx-1">{item.quantity}份</p>
					</div>
				))}
		</div>
	);
}
