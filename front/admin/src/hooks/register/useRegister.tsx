import { useNavigate } from "react-router-dom";
import RegisterDto from "../../dto/register";
import { registerAPI } from "../../api/user";

const useRegister = () => {
	const navigate = useNavigate(); //使用跳转函数
	const onFinish = async (value: RegisterDto) => {
		try {
			const res = await registerAPI(value);
			if (res) {
				navigate("/auth/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return {
		onFinish,
		onFinishFailed,
	};
};

export default useRegister;
