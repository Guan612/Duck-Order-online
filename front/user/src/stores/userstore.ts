import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/api/user";
import router from "@/router";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore(
    "user",
    () => {
        const userInfo = ref({});
        const getUserInfo = async (user) => {
          const res = await loginAPI(user);
          userInfo.value = res.userInfo;
          if(res){
            ElMessage.success("欢迎你 "+res.userInfo.loginId);
            router.push("/");
          }
        };

        const logout = () => {
            userInfo.value = {};
            ElMessage.success('退出登录成功')
            router.push("/auth/login");
        }

        return {userInfo, getUserInfo, logout};
    },
    {
        persist: true, // 持久化存储
    }
);
