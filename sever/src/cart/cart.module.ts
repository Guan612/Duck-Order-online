import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OderlistService } from 'src/oderlist/oderlist.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService,OderlistService],
})
export class CartModule {}
