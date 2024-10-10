import { Button, message } from "antd";
import useOderInfo from "../../hooks/order/useOderInfo";
export default function OrderInfo() {
	const { chartRef, orders } = useOderInfo();

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold text-center text-gray-800 m-2">
				信息总览
			</h1>
			<div ref={chartRef} className="flex w-full max-w-2xl h-96" />
			{/* 你也可以在此展示订单数据 */}
		</div>
	);
}
