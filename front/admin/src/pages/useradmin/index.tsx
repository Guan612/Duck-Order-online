import useGetUserlist from "../../hooks/userAdmin/useGetUserlist";

export default function UserAdmin() {
	const { users, getRoleName } = useGetUserlist();
	return (
		<>
			<h1 className="text-3xl font-bold m-4">用户管理</h1>
			<ul>
				{users.map((user) => (
					<div className="bg-slate-400 m-2" key={user.id}>
						<li>{user.loginId}</li>
						<li>{getRoleName(user.cost)}</li>
					</div>
				))}
			</ul>
		</>
	);
}
