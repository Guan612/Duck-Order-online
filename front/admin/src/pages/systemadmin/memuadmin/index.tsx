import useGetMenu from "../../../hooks/menuAdmin/useGetMenu";
export default function MenuAdmin() {
	const { getMenuList,getNemuTypeName, menuList } = useGetMenu();
	return (
		<div>
			<h1>Menu Admin</h1>
			<div>
				{menuList.map((menu) => (
					<div className="flex items-center justify-between border-b border-gray-200 py-4 rounded-sm m-1" key={menu.id}>
						<div>{menu.name}</div>
                        <div>{menu.price}元</div>
						<div>{menu.description}</div>
						<div>{getNemuTypeName(menu.type)}</div>
                        <image src={menu.pictureUrl} alt={menu.name} />
					</div>
				))}
			</div>
		</div>
	);
}
