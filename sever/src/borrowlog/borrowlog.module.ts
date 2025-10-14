import { Module } from '@nestjs/common';
import { BorrowlogService } from './borrowlog.service';
import { BorrowlogController } from './borrowlog.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BorrowlogController],
  providers: [BorrowlogService, PrismaService],
})
export class BorrowlogModule {}
