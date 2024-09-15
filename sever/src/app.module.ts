import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [UserModule, OrderModule, MenuModule, UploadModule, CartModule],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
