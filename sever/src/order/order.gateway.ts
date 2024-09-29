import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { namespace: '/order', cors: { origin: '*' } })
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('haveNewOder')
  async haveNewOder(@MessageBody() data, client: Socket) {
    this.server.emit('haveNewOder', data)//注意返回socket一定要添加client：socket
  }

  @SubscribeMessage('oderInfo')
  async handleOder(@MessageBody() data) {
    console.log(data);
    return 'OderInfo'
  }

  @SubscribeMessage('whereIsOder')
  async where(@MessageBody() data) {
    console.log(data);
    return 'getOder'
  }
}
