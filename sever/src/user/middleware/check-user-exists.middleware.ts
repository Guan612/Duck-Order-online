import { Injectable, NestMiddleware, ConflictException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CheckUserExistsMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { loginId } = req.body;

    const existingUser = await this.prisma.user.findUnique({
      where: { loginId },
    });

    if (existingUser) {
      throw new ConflictException('该用户已注册');
    }

    next(); // 如果用户不存在，继续处理请求
  }
}
