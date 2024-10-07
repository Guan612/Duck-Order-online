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

    return res;
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
            id:true,
            quantity: true,
            isSelect: true,
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

    return res?.cartList.map((item) => ({
      id:item.id,
      quantiy: item.quantity,
      isSelect: item.isSelect,
      ...item.menu,
    }));
  }

  update(id: number, updateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
