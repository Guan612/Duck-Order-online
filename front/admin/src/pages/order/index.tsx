import { Button, Modal, Select } from "antd";
import useOrder from "../../hooks/order/useOrder";
export default function Order() {
	const {
		orderList,
		isOrderModalOpen,
		orderDetail,
		orderOptions,
		getOrderStatus,
		handOrderleCancel,
		handOrderleOk,
		showOrderModal,
		orderSelectChange,
	} = useOrder();
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-row items-center justify-center p-2 font-bold text-2xl">
				订单管理
			</div>
			<div className="flex flex-row items-center justify-center p-2">
				<Select
					className="w-96 h-8"
					mode="multiple"
					allowClear
					placeholder="查询订单类型"
					defaultValue={[]}
					onChange={orderSelectChange}
					options={orderOptions}
				/>
			</div>
			{orderList.map((item) => (
				<div
					className="flex justify-between items-center p-2 border-b-2 min-h-16 overflow-y-auto"
					key={item.id}
				>
					<div>
						<div className="mx-1">订单编号：{item.id}</div>
						<div className="mx-1">订单金额：{item.totalPrice}</div>
						<div className="mx-1 font-bold">
							订单状态：{getOrderStatus(item.orderStatus)}
						</div>
					</div>
					<div>
						<Button
							className="mx-1"
							type="primary"
							onClick={() => showOrderModal(item.id)}
						>
							订单详情
						</Button>
						<Button>订单修改</Button>
					</div>
				</div>
			))}
			<Modal
				title="订单详情"
				open={isOrderModalOpen}
				onOk={handOrderleOk}
				onCancel={handOrderleCancel}
			>
				<div className="flex flex-col">
					<div className="flex flex-col  justify-between">
						{orderDetail.map((item) => (
							<div className="bg-slate-200 m-1 p-2 rounded-xl">
								<div>菜品：{item.name}</div>
								<div>数量：{item.quantity}份</div>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
}
