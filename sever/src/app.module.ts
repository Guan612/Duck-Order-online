import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { ChatModule } from './chat/chat.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    MenuModule,
    UploadModule,
    CartModule,
    ChatModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
