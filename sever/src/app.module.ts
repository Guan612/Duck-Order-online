import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { ChatGateway } from './chat/chat.gateway';
import { DeliveryGateway } from './delivery/delivery,getway';
import { OderlistService } from './oderlist/oderlist.service';
import { CartlistService } from './cartlist/cartlist.service';

@Module({
  imports: [UserModule, OrderModule, MenuModule, UploadModule, CartModule],
  controllers: [],
  providers: [ChatGateway,DeliveryGateway, OderlistService, CartlistService],
})
export class AppModule {}
