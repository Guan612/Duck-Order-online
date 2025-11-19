import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartListModule } from './cart-list/cart-list.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, ProductModule, CartListModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
