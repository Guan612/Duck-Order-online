import { Module } from '@nestjs/common';
import { BorrowlogService } from './borrowlog.service';
import { BorrowlogController } from './borrowlog.controller';

@Module({
  controllers: [BorrowlogController],
  providers: [BorrowlogService],
})
export class BorrowlogModule {}
