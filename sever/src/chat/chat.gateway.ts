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
import { ChatService } from './chat.service';
import { connectData } from './dto/chatDto';

@WebSocketGateway(3001, { namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('connectChat')
  handleConnect(client: Socket) {
    //console.log('connect', client.id);
    this.server.emit('connectChat', {
      connectMeg: '连接成功',
      clientId: client.id,
    });
  }

  @SubscribeMessage('onChat')
  //@UseGuards(JwtAuthGuard)
  async handleEvent(@MessageBody() connectData:connectData, client: Socket) {
    //console.log('chat', payload.message.message);
    const context = await this.chatService.addChatContext(connectData);
    this.server.emit('chat', { message: connectData.content }); // 只回复发送消息的客户端
  }

  @SubscribeMessage('disconnectChat')
  handleDisconnect(client: Socket) {
    //console.log('disconnect', client.id);
    this.server.emit('disconnectChat', {
      disconnectMeg: '断开连接',
      clientId: client.id,
    });
  }

  //测试代码
  // @SubscribeMessage('chatTest')
  // async test(@MessageBody() Select, client: Socket) {
  //   //console.log('chatTest', Select.userId);
  //   const res = await this.chatService.chatTest(Select.userId);
  //   this.server.emit('chatTest', { res }); // 只回复发送消息的客户端
  // }
}
