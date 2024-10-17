import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserBalanceService } from './userbalance.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/role';
import { User } from 'src/user/decorator/user.decorator';

@Controller('userbalance')
@ApiTags('userbalance')
export class UserBalanceController {
  constructor(private readonly userbalanceService: UserBalanceService) {}

  @Get()
  @ApiOperation({ summary: '获取用户余额' })
  @UseGuards(JwtAuthGuard)
  findUserBslance(@User('userId') userId: number) {
    return this.userbalanceService.findUserBalance(userId);
  }

  @Get('all')
  @ApiOperation({ summary: '获取所有用户余额' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.admin,Role.waiter)
  findAll() {
    return this.userbalanceService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改用户余额' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.admin,Role.waiter)
  update(@Param('id') id: string, @Body() balanceValue) {
    return this.userbalanceService.update(+id, balanceValue.balance);
  }

  @Post('activity/:id')
  @ApiOperation({ summary: '活动修改用户余额' })
  @UseGuards(JwtAuthGuard)
  activityUpdate(@Param('id') id:string, @Body() balanceValue) {
    return this.userbalanceService.addActive(+id, balanceValue.balance+100);
  }
}
