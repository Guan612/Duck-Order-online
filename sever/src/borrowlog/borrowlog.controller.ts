import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BorrowlogService } from './borrowlog.service';
import { CreateBorrowlogDto } from './dto/borrowlog.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/role';

@Controller('borrowlog')
@ApiTags('borrowlog')
export class BorrowlogController {
  constructor(private readonly borrowlogService: BorrowlogService) {}

  @Post()
  @ApiOperation({ summary: '新增借阅需求' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createBorrowlogDto: CreateBorrowlogDto) {
    return this.borrowlogService.create(createBorrowlogDto);
  }

  @Get()
  @ApiOperation({ summary: '获取借阅列表' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.borrowlogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个借阅详情' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.borrowlogService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更改借阅状态' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBorrowlogDto) {
    return this.borrowlogService.update(+id, updateBorrowlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除借阅记录' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.borrowlogService.remove(+id);
  }
}
