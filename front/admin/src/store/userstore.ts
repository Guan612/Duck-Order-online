import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import userInfoDto from "../dto/userInfo";

const userStore = create(
	persist(
		(set, get) => ({
			userInfo: {},
			setUserInfo: (userInfo: userInfoDto) => {
				set({ userInfo });
			},
			clearUserInfo: () => {
				set({ userInfo: {} });
			},
		}),

		{
			name: "userInfo", // 存储在localStorage中的key
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default userStore;
