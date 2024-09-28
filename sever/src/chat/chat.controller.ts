import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { ChatService } from './chat.service';

@Controller('chat')
@ApiTags('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}


    @Get('room')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获取聊天房间' })
    getRoom() {
        return this.chatService.getRooms();
    }
}
