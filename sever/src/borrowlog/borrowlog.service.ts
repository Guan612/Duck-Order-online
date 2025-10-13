import { Injectable } from '@nestjs/common';
import { CreateBorrowlogDto } from './dto/borrowlog.dto';

@Injectable()
export class BorrowlogService {
  create(createBorrowlogDto: CreateBorrowlogDto) {
    return 'This action adds a new borrowlog';
  }

  findAll() {
    return `This action returns all borrowlog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowlog`;
  }

  update(id: number, updateBorrowlogDto) {
    return `This action updates a #${id} borrowlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowlog`;
  }
}
