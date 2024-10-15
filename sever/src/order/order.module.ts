import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OderlistService } from 'src/orderlist/orderlist.service';
import { UserBalanceService } from 'src/userbalance/userbalance.service';
import { OrderGateway } from './order.gateway';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, OderlistService, OrderGateway, UserBalanceService],
})
export class OrderModule {}
