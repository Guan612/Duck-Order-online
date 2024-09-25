import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OderlistService {
  constructor(private prisma: PrismaService) {}

  async findByOrderId(id: number) {
    const res = await this.prisma.oderList.findMany({
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
}
