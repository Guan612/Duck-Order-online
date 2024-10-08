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
    return results;// 注意是数组所以需要全部返回， 最后返回所有的结果
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
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

  async update(id: number) {}

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
