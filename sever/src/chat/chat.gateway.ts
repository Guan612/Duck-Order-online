import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';

@WebSocketGateway(3001, { namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  //@UseGuards(JwtAuthGuard)
  handleEvent(@MessageBody() payload: string, client: Socket) {
    this.server.emit('chat', { message: payload,  }); // 只回复发送消息的客户端
  }
}
