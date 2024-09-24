import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../api/user";
import userStore from "../../store/userstore";
import { message } from "antd";
import { user } from "../../dto/user";

const useLogin = () => {
	const navigate = useNavigate(); //使用跳转函数
	const { setUserInfo } = userStore();
	const onFinish = async (values: user) => {
		try {
			const { userInfo } = await adminLoginAPI(values);
			setUserInfo(userInfo);
			navigate("/");
			message.success("欢迎你，" + userInfo.loginId);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return { onFinish, onFinishFailed };
};

export default useLogin; // 导出useLogin函数
