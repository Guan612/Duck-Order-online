import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OderlistService } from 'src/oderlist/oderlist.service';
import { OrderGateway } from './order.gateway';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, OderlistService, OrderGateway],
})
export class OrderModule {}
