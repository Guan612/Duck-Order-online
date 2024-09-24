import { Injectable } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dto/menuDto';
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

  async searchByType(menuType: number[]) {
    const res = await this.prisma.menu.findMany({
      where: {
        type: {
          in: menuType, // 直接传递 menuType 数组
        },
        isSell: 1, // 查找 isSell 为 1 的菜单项
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

  update(id: number, updateMenu: UpdateMenuDto) {
    const res = this.prisma.menu.update({
      where: { id: id },
      data: updateMenu,
    });

    return res;
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
