import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const res = await this.prisma.order.create({
      data: createOrderDto,
    });
    return res;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async totalPrice(id: number) {
    const catResult = await this.cartService.findByOrderId(id);
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
