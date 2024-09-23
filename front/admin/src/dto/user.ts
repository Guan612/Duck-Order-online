enum cost {
    管理员 = 2,
    服务员 = 1,
    用户 = 0
}

interface user {
	id?: number;
	loginId: string;
	nikcname?: string;
	email?: string;
	phone?: string;
	passworrd: string;
	cost: cost
}

interface RegisterDto {
	loginId: string;
	nickname?: string;
	password: string;
	email?: string;
	phone?: string;
	cost?: cost
}

export { cost };
export type { user, RegisterDto };