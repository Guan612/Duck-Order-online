import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaClient) {}
  
  async addChatContext(connectData){
    const res = await this.prisma.message.create({
      data: connectData
    });
    return res;
  }

  async getRooms(){
    const res = await this.prisma.chatRoom.findMany();
    return res;
  }

  async getRoomById(roomId){
    const res = await this.prisma.chatRoom.findUnique({
      where: { id: roomId },
    });

    // return {
    //   name: res.name,
    // };
  }

  async chatTest(userId) {
    const res = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return res;
  }

}
