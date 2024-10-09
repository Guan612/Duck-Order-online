import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartlistService } from 'src/cartlist/cartlist.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, CartlistService],
})
export class CartModule {}
