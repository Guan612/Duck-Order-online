import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { ChatModule } from './chat/chat.module';
import { DeliveryModule } from './delivery/delivery.module';
import { UserBalanceModule } from './userbalance/userbalance.module';
import { ArticleModule } from './article/article.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    OrderModule,
    MenuModule,
    UploadModule,
    CartModule,
    ChatModule,
    DeliveryModule,
    UserBalanceModule,
    ArticleModule,
    ServeStaticModule.forRoot(
      {
        // 指向 front 应用的打包目录
        rootPath: join(__dirname, '..', 'client', 'user'),
        // URL 前缀
        serveRoot: '/user',
        // 建议保留，避免与API冲突
        exclude: ['/api/(.*)'],
      },
      // 第二个对象：配置 /admin 后台管理前端
      {
        // 指向 admin 应用的打包目录
        rootPath: join(__dirname, '..', 'client', 'admin'),
        // URL 前缀
        serveRoot: '/admin',
        // 建议保留，避免与API冲突
        exclude: ['/api/(.*)'],
      },
    ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
