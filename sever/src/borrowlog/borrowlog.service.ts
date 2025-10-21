import { Injectable } from '@nestjs/common';
import { CreateBorrowlogDto, UpdateBorrowlogDto } from './dto/borrowlog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBorrowlogDto: CreateBorrowlogDto) {
    const res = await this.prisma.borrowLog.create({
      data: createBorrowlogDto,
    });

    return res;
  }

  async findAll() {
    const res = await this.prisma.borrowLog.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.borrowLog.findUnique({
      where: { id: id },
    });
    return res;
  }

  async update(id: number, updateBorrowlogDto: UpdateBorrowlogDto) {
    const res = await this.prisma.borrowLog.update({
      where: { id: id },
      data: updateBorrowlogDto,
    });
  }

  async remove(id: number) {
    const res = await this.prisma.borrowLog.delete({
      where: { id: id },
    });
    return res;
  }
}
