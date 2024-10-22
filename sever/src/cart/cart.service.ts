import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/cartDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async create(userId) {
    const res = await this.prisma.cart.create({
      data: {
        userId: userId,
      },
    });

    return res;
  }

  findAll() {
    return `This action returns all cart`;
  }

  async findUserCart(userId: number) {
    const res = await this.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      select:{
        id: true,
      }
    });

    return res.id;
  }

  async findByUserId(id: number) {
    const res = await this.prisma.cart.findUnique({
      where: {
        userId: id,
      },
      select: {
        id: true,
        userId: true,
        cartList: {
          select: {
            id: true,
            quantity: true,
            isSelect: true,
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

    return res?.cartList.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      isSelect: item.isSelect,
      name: item.menu.name,
      price: item.menu.price,
      menuId: item.menu.id,
    }));
  }

  update(id: number, updateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
