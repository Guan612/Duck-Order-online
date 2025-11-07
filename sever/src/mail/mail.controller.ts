import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto, UpdateMailDto } from './dto/mail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: '创建新诉求' })
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有诉求' })
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个诉求' })
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新诉求' })
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除诉求' })
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
