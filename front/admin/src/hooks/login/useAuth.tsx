import userStore from "../../store/userstore";

const userInfo = userStore.getState().userInfo;

const useAuth = () => {
    return userInfo.token;
}

export default useAuth; // 导出useAuth函数