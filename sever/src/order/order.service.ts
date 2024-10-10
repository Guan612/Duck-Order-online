import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OderlistService } from 'src/orderlist/orderlist.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private OderlistService: OderlistService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const res = await this.prisma.order.create({
      data: createOrderDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.order.findMany({
      include: {
        user: {
          select: {
            loginId: true,
          },
        },
      },
    });
    return res.map((item) => {
      return {
        ...item,
        loginId: item.user.loginId,
        user: undefined,
      };
    });
  }

  async findByOrderStatus(orderStatus: number[]) {
    const res = await this.prisma.order.findMany({
      where: { orderStatus: { in: orderStatus } },
      include: {
        user: {
          select: {
            loginId: true,
          },
        },
      },
    });

    return res.map((item) => {
      return {
        ...item,
        loginId: item.user.loginId,
        user: undefined,
      };
    });
  }

  async findOne(id: number) {
    const res = await this.prisma.order.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            loginId: true,
          },
        },
      },
    });
    return {
      ...res,
      loginId: res.user.loginId,
      user: undefined,
    };
  }

  async totalPrice(id: number) {
    const catResult = await this.OderlistService.findByOrderId(id);
    const totalPrice = catResult.reduce((acc: number, cur) => {
      return acc + cur.menu.price * cur.quantity;
    }, 0);
    await this.prisma.order.update({
      where: { id: id },
      data: {
        totalPrice: totalPrice,
      },
    });
    return totalPrice;
  }

  async update(id: number, updateOrderDto) {
    const res = await this.prisma.order.update({
      where: { id: id },
      data: updateOrderDto,
    });
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
