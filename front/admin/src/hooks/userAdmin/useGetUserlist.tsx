import { useState, useEffect } from "react";
import { getAllUserAPI } from "../../api/user";
import { cost } from "../../dto/user";

const useGetUserlist = () => {
	const [users, setUsers] = useState([]);

	const getUser = async () => {
		const res = await getAllUserAPI();
		setUsers(res);
	};

	const getRoleName = (costValue: number): string => {
		return cost[costValue] || "未知角色";
	};

	useEffect(() => {
		getUser();
	}, []);

	return { setUsers, getUser, getRoleName, users };
};

export default useGetUserlist;
