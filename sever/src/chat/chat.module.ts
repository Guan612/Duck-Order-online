import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [ChatGateway, ChatService, PrismaClient],
  controllers: [ChatController],
})
export class ChatModule {}
