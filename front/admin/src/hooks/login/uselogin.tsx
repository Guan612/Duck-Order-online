import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/user";
import userStore from "../../store/userstore";

const useLogin = () => {
	const navigate = useNavigate(); //使用跳转函数
	const { setUserInfo } = userStore();
	const onFinish = async (values) => {
		try {
			const { result } = await loginAPI(values);
			setUserInfo(result);
			navigate("/");
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
