import userStore from "../../store/userstore";

const useAuth = () => {
	const userInfo = userStore((state) => state.userInfo); // 订阅 userInfo 的状态变化
	return userInfo?.token ? true : false; // 如果 token 存在，表示用户已登录
};

export default useAuth; // 导出useAuth函数
