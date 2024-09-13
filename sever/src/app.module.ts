import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [UserModule, OrderModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
