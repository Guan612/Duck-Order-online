enum menuType {
	"热菜" = 0,
	"凉菜" = 1,
	"主食" = 2,
	"汤" = 3,
	"饮品" = 4,
}

interface menu {
	id: number;
	name: string;
	type: menuType;
	price: number;
	isSell:number;
	discription?: string;
	pictureUrl?: string;
}

export { menuType };
export type { menu };
