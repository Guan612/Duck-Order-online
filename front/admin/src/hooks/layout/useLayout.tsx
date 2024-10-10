import { useEffect, useState } from "react";
import useSocket from "../../api/socket";
import { message } from "antd";
export default function useAllInfo() {
	const socket = useSocket("order");
	const [orderMessage, setOrderMessage] = useState([]);
	const [orderList, setOrderList] = useState([]);

	//语音播报功能
	const speak = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		window.speechSynthesis.speak(utterance);
	};

	// 系统通知功能
	const showNotification = (title: string, message: string) => {
		// 检查浏览器是否支持通知
		if ("Notification" in window) {
			// 请求通知权限
			if (Notification.permission === "granted") {
				// 显示通知
				new Notification(title, { body: message });
			} else if (Notification.permission !== "denied") {
				// 请求权限
				Notification.requestPermission().then((permission) => {
					if (permission === "granted") {
						new Notification(title, { body: message });
					}
				});
			}
		}
	};

	// const testOrder = () => {
	// 	socket.emit("haveNewOder", {
	// 		message: "张佳宁是原批",
	// 	});
	// };

	useEffect(() => {
		const handleNewOrder = (data) => {
			if (data) {
				speak(data.message);
				showNotification("新订单提醒", data.message);
				message.info(data.message);
				setOrderMessage(data.message);
				setOrderList(data.orderList);
			}
		};

		const handlePayOrder = (data) => {
			if (data) {
				speak(data.message);
				showNotification("订单支付提醒", data.message);
				message.info(data.message);
			}
		};

		const handleExitPayment = (data) => {
			if (data) {
				speak(data.message);
				showNotification("订单支付取消提醒", data.message);
				message.info(data.message);
			}
		};

		socket.on("haveNewOder", handleNewOrder);
		socket.on("payOrder", handlePayOrder);
		socket.on("exitPayment", handleExitPayment);

		// 清理连接
		return () => {
			socket.off("haveNewOder", handleNewOrder);
			socket.off("payOrder", handlePayOrder);
			socket.off("exitPayment", handleExitPayment);
		};
	}, [socket]);

	return { orderMessage, orderList };
}
