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
    // 获取所有用户并按 balance 从高到低排序
    const users = await this.prisma.userBalance.findMany({
      orderBy: { balance: 'desc' },
      select: { id: true, userId: true, balance: true },
    });

    // 找到指定用户在排序列表中的位置
    const index = users.findIndex((user) => user.userId === userId);

    if (index === -1) {
      throw new Error('User not found');
    }

    // 绝对排名是 index + 1
    return index + 1;
  }
}
