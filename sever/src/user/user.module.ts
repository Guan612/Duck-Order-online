import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './service/auth.service';
import { CartService } from 'src/cart/cart.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserBalanceService } from 'src/userbalance/userbalance.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 替换为安全的 secret
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }, // 替换为合适的过期时间
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    AuthService,
    JwtStrategy,
    CartService,
    UserBalanceService
  ], //注意需要把prismaService也注入进来
})
export class UserModule {}
