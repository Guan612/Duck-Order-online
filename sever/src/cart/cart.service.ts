import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async create(createCartDto: CreateCartDto) {
    const res = await this.prisma.cart.create({
      data: createCartDto,
    });
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async findByOrderId(id: number) {
    const res = await this.prisma.cart.findMany({
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

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
