import { NavLink } from "react-router-dom";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const sysNest = [
	{
		key: 1,
		label: "菜单管理",
		link: "/menuadmin",
	},
	{
		key: 2,
		label: "角色管理",
		link: "/cosadmin",
	},
	{
		key: 3,
		label: "用户管理",
		link: "/useradmin",
	},
	{
		key: 4,
		label: "客服聊天",
		link: "/chat"
	},
	{
		key: 5,
		label: "订单管理",
		link: "/order"
	}
];

const infoNest = [
	{
		key: 1,
		label: "订单信息",
		link: "/oederInfo"
	}
]

const items: CollapseProps["items"] = [
	{
		key: 1,
		label: "基础信息",
		children: (
			<>
				{infoNest.map((item) => (
					<div className="p-1">
						<div className="bg-red-200 rounded-md p-3">
							<NavLink to={item.link} key={item.key}>
								{item.label}
							</NavLink>
						</div>
					</div>
				))}
			</>
		)
	},
	{
		key: 2,
		label: "管理选项",
		children: (
			<>
				{sysNest.map((item) => (
					<div className="p-1">
						<div className="bg-red-200 rounded-md p-3">
							<NavLink to={item.link} key={item.key}>
								{item.label}
							</NavLink>
						</div>
					</div>
				))}
			</>
		),
	},
];

const sidebar = () => {
	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	return (
		<>
			<div className="bg-white text-center p-2 font-bold text-2xl">
				<NavLink to={'/'}>后台管理</NavLink>
			</div>
			<Collapse onChange={onChange} items={items} />
		</>
	);
};

export default sidebar;
