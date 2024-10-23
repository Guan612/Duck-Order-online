enum menuType {
	"清洁用品" = 0,
	"洗化用品" = 1,
	"餐具类" = 2,
	"水壶类" = 3,
	"保洁用具" = 4,
	"文具类" = 5,
}

interface menu {
	id: number;
	name: string;
	type: menuType;
	price: number;
	isSell: number;
	discription?: string;
	pictureUrl?: string;
}

export { menuType };
export type { menu };
