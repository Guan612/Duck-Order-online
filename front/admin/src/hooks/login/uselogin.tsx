import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../api/user";
import userStore from "../../store/userstore";
import userInfoDto from "../../dto/userInfo";

const useLogin = () => {
	const navigate = useNavigate(); //使用跳转函数
	const { setUserInfo } = userStore();
	const onFinish = async (values) => {
		try {
			const { userInfo } = await adminLoginAPI(values);
			setUserInfo(userInfo);
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
