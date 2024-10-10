import { Button, message } from "antd";
import ReactECharts from 'echarts-for-react';
import useOderInfo from "../../hooks/order/useOderInfo";
export default function OrderInfo() {
	const { orderChartRef, menuChartRef, orders, totalPrice, menuOptions } = useOderInfo();

	return (
		<>
			<div>
				<h1 className="text-2xl font-bold text-center text-gray-800 m-2">
					信息总览
				</h1>

				<div className="text-xl font-bold text-center text-gray-600 m-2">
					总销售额：{totalPrice}元
				</div>
			</div>
			<div className="flex flex-col items-center justify-center m-2">
				<div
					ref={orderChartRef}
					className="flex w-full max-w-2xl h-96"
				/>
			</div>
			<div className="flex flex-col items-center justify-center m-2">
				<div
					ref={menuChartRef}
					className="flex w-full max-w-2xl h-96"
				></div>
				<div>
					<ReactECharts option={menuOptions} style={{ width: '42rem', height: '400px' }}/>
				</div>
			</div>
		</>
	);
}
