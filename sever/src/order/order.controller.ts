import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Role } from 'src/user/dto/role';
import { Roles } from 'src/user/decorator/roles.decorator';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: '创建订单' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    createOrderDto.userId = req.user.userId;
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.user)
  @ApiOperation({ summary: '获取所有订单' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个订单' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get("total/:id")
  @ApiOperation({ summary: '获取订单总价' })
  getTotalPrice(@Param('id') id: string) {
    return this.orderService.totalPrice(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新订单' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除订单' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
