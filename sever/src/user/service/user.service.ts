import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(user: CreateUserDto) {
    const res = await this.prisma.user.create({
      data: user,
    });

    return res;
  }

  async findAll() {
    const res = await this.prisma.user.findMany();
    return res;
  }

  async findByLoginId(loginId: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        loginId: loginId,
      },
    });

    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  update(id: number, updateUserData) {
    const res = this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserData,
    });

    return res;
  }

  remove(id: number) {
    const res = this.prisma.user.delete({
      where: { id: id },
    });
    return res;
  }
}
