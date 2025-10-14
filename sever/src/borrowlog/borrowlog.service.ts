import { Injectable } from '@nestjs/common';
import { CreateBorrowlogDto, UpdateBorrowlogDto } from './dto/borrowlog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBorrowlogDto: CreateBorrowlogDto) {
    return 'This action adds a new borrowlog';
  }

  findAll() {
    return `This action returns all borrowlog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowlog`;
  }

  update(id: number, updateBorrowlogDto: UpdateBorrowlogDto) {
    return `This action updates a #${id} borrowlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowlog`;
  }
}
