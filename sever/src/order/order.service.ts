import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OderlistService } from 'src/orderlist/orderlist.service';
import { UserBalanceService } from 'src/userbalance/userbalance.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private oderlistService: OderlistService,
    private userBalanceService: UserBalanceService,
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
    const catResult = await this.oderlistService.findByOrderId(id);
    const totalPrice = catResult.reduce((acc: number, cur) => {
      return acc + cur.menu.price * cur.quantity;
    }, 0);
    //调用这个api时自动更新价格
    await this.prisma.order.update({
      where: { id: id },
      data: {
        totalPrice: totalPrice,
      },
    });
    return totalPrice;
  }

  async payByBalance(id: number, userId:number) {
    const price =  await this.totalPrice(id);
    const balanceRes = await this.userBalanceService.findUserBalance(userId);
    if (balanceRes.balance >= price) {
      await this.prisma.order.update({
        where: { id: id },
        data: {
          orderStatus: 2,
        },
      });
      const res =  await this.userBalanceService.update(balanceRes.id, balanceRes.balance-price);
      return res;
    } else {
      return false;
    }
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

  async allInfo() {
    const res = await this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            loginId: true,
          },
        },
        orderList: {
          include: {
            menu: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
    return res;
  }

  async findByUserId(id: number) {
    const res = await this.prisma.order.findMany({
      where:{userId:id},
      include:{
        orderList:{
          include:{
            menu:{
              select:{
                name:true,
              }
            }
          }
        }
      }
    })
    return res;
  }
}
