import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/cartDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async create(createCartDto) {
    const res = await this.prisma.cart.create({
      data: createCartDto,
    });
  }

  findAll() {
    return `This action returns all cart`;
  }

  async findOne(id: number) {
    const res = await this.prisma.cart.findFirst({
      where: {
        userId: id,
      },
      select: {
        id: true,
        userId: true,
        cartList: {
          select: {
            quantity: true,
            menu: {
              select: {
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

  update(id: number, updateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
