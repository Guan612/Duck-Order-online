import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001,{namespace:'/delivery',cors:{origin:'*'}})
export class DeliveryGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('delivery')
    handleDelivery(@MessageBody() paylod:string, client: Socket) {
        //console.log(paylod);
        this.server.emit('delivery',paylod);
    }
}