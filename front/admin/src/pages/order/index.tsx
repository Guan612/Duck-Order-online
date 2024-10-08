import useOrder from "../../hooks/order/useOrder";
export default function Order() {
	const { orderList, getOrderStatus } = useOrder();
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-row items-center justify-center p-2 font-bold text-2xl">
				订单管理
			</div>
			{orderList.map((item) => (
				<div
					className="flex items-center p-2 border-b-2 min-h-16 overflow-y-auto"
					key={item.id}
				>
					<div className="mx-1">订单编号：{item.id}</div>
					<div className="mx-1">订单状态：{getOrderStatus(item.orderStatus)}</div>
                    <div className="mx-1">订单金额：{item.totalPrice}</div>
				</div>
			))}
		</div>
	);
}
