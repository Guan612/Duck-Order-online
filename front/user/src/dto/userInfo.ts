export type LoginInfo =  {
    loginId: string,
    password: string,
}

export type RegisterInfo = {
    loginId: string,
    password: string,
    nickname?: string,
    email?: string,
    phone?: string,
}