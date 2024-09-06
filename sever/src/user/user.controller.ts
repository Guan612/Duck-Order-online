import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  login(@Body() loginDto: User) {
    return "登录成功"
    //return this.userService.login(loginDto);
  }

  @Get()
  @ApiOperation({ summary: '查找所有用户' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '查找指定用户' })
  @ApiParam({ name: 'id', type: 'number' }) // 添加参数说明
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: string, @Body() updateUserData) {
    //console.log(updateUserData);
    return this.userService.update(+id, updateUserData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
