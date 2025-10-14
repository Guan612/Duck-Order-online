import { Injectable } from '@nestjs/common';
import { CreateBorrowlogDto, UpdateBorrowlogDto } from './dto/borrowlog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBorrowlogDto) {
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

  update(id: number, updateBorrowlogDto: UpdateBorrowlogDto) {
    return `This action updates a #${id} borrowlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowlog`;
  }
}
