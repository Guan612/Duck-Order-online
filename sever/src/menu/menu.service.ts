import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/menuDto';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  async create(createMenuDto: CreateMenuDto) {
    const res = this.prisma.menu.create({
      data: createMenuDto,
    });

    return res;
  }

  async findAll() {
    const res = this.prisma.menu.findMany();
    return res;
  }

  async search(menuName: string) {
    const res = await this.prisma.menu.findMany({
      where: {
        name: {
          contains: menuName,
        },
      },
    });

    return res;
  }

  async searchByType(menuType: number) {
    const res = await this.prisma.menu.findMany({
      where: {
        type: menuType,
        isSell: 1,
      },
    });

    return res;
  }

  async findOne(id: number) {
    const res = this.prisma.menu.findUnique({
      where: {
        id: id,
      },
    });

    return res;
  }

  update(id: number, updateMenuDto: any) {
    return `This action updates a #${id} menu`;
  }

  async remove(id: number) {
    await this.prisma.menu.delete({
      where: {
        id: id,
      },
    });
    return 'delete success';
  }
}
