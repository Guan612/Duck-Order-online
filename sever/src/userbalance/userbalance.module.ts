import { Module } from '@nestjs/common';
import { UserBalanceService } from './userbalance.service';
import { UserBalanceController } from './userbalance.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserBalanceController],
  providers: [UserBalanceService,PrismaService],
})
export class UserBalanceModule {}
