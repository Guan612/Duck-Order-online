import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, PrismaService], //注意需要把prismaService也注入进来
})
export class UserModule {}
