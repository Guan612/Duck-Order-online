import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserBalanceService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number) {
    const res = await this.prisma.userBalance.create({
      data: {
        userId: userId,
      },
    });
    return res;
  }

  async findUserBalance(userId: number) {
    const res = await this.prisma.userBalance.findUnique({
      where: {
        userId: userId,
      },
    });
    return res;
  }

  async update(id: number, balance: number) {
    const res = await this.prisma.userBalance.update({
      where: {
        id: id, // 使用传入的 id 变量
      },
      data: {
        balance: balance, // 直接更新 balance 值
      },
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.userBalance.findMany({
      include: {
        user: {
          select: {
            loginId: true,
          },
        },
      },
    });

    return res.map(({ user, ...balanceData }) => ({
      ...balanceData,
      loginId: user.loginId,
    }));
  }

  async addActive(id: number, balance: number) {
    const res = await this.prisma.userBalance.update({
      where: {
        id: id,
      },
      data: {
        balance: balance,
      },
    });

    return res;
  }

  async upBalance() {
    const res = await this.prisma.userBalance.findMany({
      orderBy: {
        balance: 'desc',
      },
      take: 10,
      include: {
        user: {
          select: {
            loginId: true,
          },
        },
      },
    });

    return res.map(({ user, ...balanceData }) => ({
      ...balanceData,
      loginId: user.loginId,
    }));
  }

  async myRank(userId: number) {
    // 获取用户的 balance
    const user = await this.prisma.userBalance.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // 查询比用户 balance 高的用户数量，这样可以计算出排名
    const rank = await this.prisma.userBalance.count({
      where: {
        balance: { gt: user.balance },
      },
      orderBy: {
        balance: 'desc', // 确保排序方式正确
      },
    });

    // 排名是比用户 balance 高的用户数 + 1
    return rank + 1;
  }
}
