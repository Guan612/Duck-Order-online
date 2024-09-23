import { Button, Input, Select } from "antd";
const { Search } = Input;

import useGetMenu from "../../../hooks/menuAdmin/useGetMenu";
import useEditMenu from "../../../hooks/menuAdmin/useEditMenu";

export default function MenuAdmin() {
	const { getMenuList, getNemuTypeName, menuList } = useGetMenu();
	const { changeSell } = useEditMenu();
	return (
		<div className="flex flex-col h-full">
			<div className="h-1/4 flex flex-col">
				<h1 className="text-2xl font-bold mb-4 text-center">
					菜品管理
				</h1>
				<div className="flex justify-between items-center mb-4">
					<Button type="primary">新增菜品</Button>
					<Select
						mode="multiple"
						allowClear
						placeholder="选择菜品类型"
						defaultValue={[]}
						// onChange={handleChange}
						// options={options}
					/>
					<Search
						placeholder="输入菜品名字以搜索"
						allowClear
						enterButton="搜索"
						size="large"
						// onSearch={onSearch}
					/>
				</div>
				<div className="flex items-center justify-between py-4 rounded-sm m-1 bg-slate-400">
					<div>菜名</div>
					<div>价格</div>
					<div>类型</div>
					<div className="hidden md:block">菜品图片</div>
				</div>
			</div>

			<div className="overflow-y-auto h-3/4">
				{menuList.map((menu) => (
					<div
						className="flex items-center justify-between border-b border-gray-200 py-4 rounded-sm m-1"
						key={menu.id}
					>
						<div>{menu.name}</div>
						<div>{menu.price}元</div>
						<div>{menu.description}</div>
						<div>{getNemuTypeName(menu.type)}</div>
						<img
							className="hidden md:block"
							src={menu.pictureUrl}
							alt={menu.name}
						/>
						<Button type="primary" onClick={() => changeSell(menu.id, menu.isSell)}>
							{menu.isSell ? "下架" : "上架"}
						</Button>
						<Button type="primary">编辑菜品</Button>
					</div>
				))}
			</div>
		</div>
	);
}
