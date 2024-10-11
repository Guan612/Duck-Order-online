import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartlistService {
  constructor(private prisma: PrismaService) {}
  addCartList(addCartListDto, cartId: number) {
    const {
      menuId,
      quantity,
    }: {
      menuId: number;
      quantity?: number;
    } = addCartListDto;
    return this.prisma.cartList.create({
      data: {
        cartId: cartId,
        menuId: menuId,
        quantity: quantity || 1,
      },
    });
  }

  async getCartList(cartId: number) {
    const res = await this.prisma.cartList.findMany({
      where: {
        cartId: cartId,
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

  async removeCartList(deletList: number[]) {
    for (let i = 0; i < deletList.length; i++) {
      await this.prisma.cartList.delete({
        where: {
          id: +deletList[i],
        },
      });
    }
    return '删除成功';
  }
}
