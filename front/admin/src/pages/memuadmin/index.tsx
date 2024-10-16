import { Button, Form, Input, Modal, Select, Table } from "antd";
const { Search } = Input;

import useGetMenu from "../../hooks/menuAdmin/useMenu";
import { menu } from "../../dto/menu";

export default function MenuAdmin() {
	const {
		changeSell,
		getMenuList,
		searchMenu,
		getNemuTypeName,
		menuSelectChange,
		openMenuModal,
		cancelMenuModal,
		onFinishMenuModal,
		onFinishFailedMenuModal,
		okMenuModal,
		openAddMenuModal,
		onFinishAddModal,
		okAddModal,
		cancelAddModal,
		menuList,
		menuOptions,
		colums,
		isModalOpen,
		currentMenu,
		addMenu,
		updateform,
		isaddMenuModalOpen,
	} = useGetMenu();
	return (
		<div className="flex flex-col h-full">
			<div className="h-1/4 flex flex-col">
				<h1 className="text-2xl font-bold mb-4 text-center">
					菜品管理
				</h1>
				<div className="flex justify-between items-center mx-2">
					<Button
						type="primary"
						className="h-8"
						onClick={openAddMenuModal}
					>
						新增菜品
					</Button>
					<Select
						className="w-1/3 h-8"
						mode="multiple"
						allowClear
						placeholder="选择菜品类型"
						defaultValue={[]}
						onChange={menuSelectChange}
						options={menuOptions}
					/>
					<Search
						placeholder="输入菜品名字以搜索"
						className="w-1/3 h-8"
						allowClear
						enterButton="搜索"
						onSearch={(value) => searchMenu(value)}
					/>
				</div>
				<div className="flex items-center justify-between py-4 rounded-sm m-1 bg-slate-400">
					<div>菜名</div>
					<div>价格</div>
					<div className="hidden md:block">类型</div>
					<div className="hidden md:block">菜品图片</div>
				</div>
				<Modal title="创建菜品" 
					open={isaddMenuModalOpen}
					onOk={okAddModal}
					onCancel={cancelAddModal}
				>
					<Form
						form={updateform}
						onFinish={onFinishAddModal}
					>
						<Form.Item label="菜品名字" name='name'>
							<Input placeholder={addMenu.name} />
						</Form.Item>
						<Form.Item label="菜品价格" name='price'>
							<Input placeholder={addMenu.price} />
						</Form.Item>
					</Form>
				</Modal>
			</div>

			<div className="overflow-y-auto h-3/4">
				{menuList.map((menu: menu) => (
					<div
						className="flex items-center justify-between border-b border-gray-200 py-4 rounded-sm m-1"
						key={menu.id}
					>
						<div>{menu.name}</div>
						<div>{menu.price}元</div>
						<div className="hidden md:block">
							{menu.discription||"无描述" }
						</div>
						<div className="hidden md:block">
							{getNemuTypeName(menu.type)}
						</div>
						<img
							className="hidden md:block w-24 h-24"
							src={menu.pictureUrl}
							alt={menu.name}
						/>
						<Button
							type="primary"
							onClick={() => changeSell(menu.id, menu.isSell)}
						>
							{menu.isSell ? "下架" : "上架"}
						</Button>
						<Button
							type="primary"
							onClick={() => openMenuModal(menu)}
						>
							编辑菜品
						</Button>
					</div>
				))}
				{/* <Table dataSource={menuList} columns={colums} className="flex w-full"/> */}
			</div>
			<Modal
				title="修改菜品"
				open={isModalOpen}
				onOk={okMenuModal}
				onCancel={cancelMenuModal}
			>
				{currentMenu && ( // 检查 currentMenu 是否存在
					<Form
						form={updateform}
						layout="horizontal"
						onFinish={onFinishMenuModal}
						onFinishFailed={onFinishFailedMenuModal}
					>
						<Form.Item label="修改菜名" name="name">
							<Input placeholder={currentMenu.name} />
						</Form.Item>
						<Form.Item label="价格" name="price">
							<Input placeholder={currentMenu.price} />
						</Form.Item>
						<Form.Item label="类型" name="type">
							<Select
								options={menuOptions}
								// defaultValue={getNemuTypeName(currentMenu.type)}
							></Select>
						</Form.Item>
						<Form.Item label="菜品描述" name="discription">
							<Input placeholder={currentMenu.discription} />
						</Form.Item>
						<Form.Item
							label="菜品图片"
							name="pictureUrl"
						></Form.Item>
					</Form>
				)}
			</Modal>
		</div>
	);
}
