import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './service/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, JwtService,JwtStrategy], //注意需要把prismaService也注入进来
  imports: [],
})
export class UserModule {}
