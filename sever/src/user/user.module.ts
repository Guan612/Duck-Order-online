import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckUserExistsMiddleware } from './middleware/check-user-exists.middleware';
import { HashPasswordMiddleware } from './middleware/hash-password.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], //注意需要把prismaService也注入进来
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserExistsMiddleware, HashPasswordMiddleware)
      .forRoutes({ path: '/user/register', method: RequestMethod.POST })
  }
}
