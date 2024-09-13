import { message } from "antd";

// 创建自定义 hook 来处理消息弹窗
const useMessageHandler = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const errorMsg = (errorMsg: string) => {
		messageApi.open({
			type: "error",
			content: errorMsg,
		});
	};

	const successMsg = (successMsg: string) => {
		messageApi.open({
			type: "success",
			content: successMsg,
		});
	};

	return { errorMsg, successMsg, contextHolder };
};

export default useMessageHandler;
