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
    const res = await this.prisma.order.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.order.findUnique({
      where: { id: id },
    });
    return res;
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
