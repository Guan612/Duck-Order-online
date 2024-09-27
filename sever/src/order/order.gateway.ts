import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(3001,{ namespace: '/order', cors: { origin: '*' }})
export class OrderGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('whereIsOder')
  async where(@MessageBody() data){
    console.log(data);
    return 'getOder'
  }
}
