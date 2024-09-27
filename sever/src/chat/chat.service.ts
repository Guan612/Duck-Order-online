import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaClient) {}
  async chatTest(userId) {
    const res = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return res;
  }
}
