import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserBalanceService {
    constructor(private prisma: PrismaService) {}
    async create(userId: number) {
        const res = await this.prisma.userBalance.create({
            data:{
                userId: userId,
            }
        })
        return res;
    }

    async findUserBalance(userId: number) {
        const res = await this.prisma.userBalance.findFirst({
            where: {
                userId: userId,
            }
        })
        return res;
    }

    async update(id: number, balance: number) {
        const res = await this.prisma.userBalance.update({
            where: {
                id: id,
            },
            data:{
                balance: balance,
            }
        })
        return res;
    }

    async findAll() {
        const res = await this.prisma.userBalance.findMany({
            include:{
                user:{
                    select:{
                        id: true,
                        loginId: true,
                    }
                }
            }
        })
        return res
    }
}