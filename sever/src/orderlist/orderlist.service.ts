import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OderlistService {
  constructor(private prisma: PrismaService) {}

  async findByOrderId(id: number) {
    const res = await this.prisma.orderList.findMany({
      where: {
        orderId: id,
      },
      include: {
        menu: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    return res;
  }

  async addOrderList(createOrderList) {
    const results = [];

    for (let i = 0; i < createOrderList.length; i++) {
      const res = await this.prisma.orderList.create({
        data: {
          orderId: +createOrderList[i].orderId,
          quantity: createOrderList[i].quantity,
          menuId: createOrderList[i].menuId,
        },
      });
      results.push(res); // 将每次的结果存入数组
    }
    return results; // 注意是数组所以需要全部返回， 最后返回所有的结果
  }

  async findOrderList(orderId: number) {
    const res = await this.prisma.orderList.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        menu: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    return res.map((item) => ({
      ...item,
      name: item.menu.name, // 将 menu.name 提取为同级属性
      price: item.menu.price, // 将 menu.price 提取为同级属性
      menu: undefined, // 删除 menu 字段
    }));
  }
}
