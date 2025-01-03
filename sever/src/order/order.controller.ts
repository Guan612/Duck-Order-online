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
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OderlistService } from 'src/orderlist/orderlist.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Role } from 'src/user/dto/role';
import { Roles } from 'src/user/decorator/roles.decorator';
import { User } from 'src/user/decorator/user.decorator';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly OderlistService: OderlistService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建订单' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    createOrderDto.userId = req.user.userId;
    return this.orderService.create(createOrderDto);
  }

  @Post('/list/:id')
  @ApiOperation({ summary: '添加订单列表' })
  @UseGuards(JwtAuthGuard)
  addList(
    @Param('id') orderId: number,
    @Body() createOrderListDto: any,
    @Request() req,
  ) {
    createOrderListDto = createOrderListDto.map((order) => ({
      ...order,
      orderId, // 给每个订单项赋值 orderId,注意是数组
    }));
    return this.OderlistService.addOrderList(createOrderListDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  @ApiOperation({ summary: '获取所有订单' })
  findAll() {
    return this.orderService.findAll();
  }

  //注意路由匹配问题
  @Get('status')
  @ApiOperation({ summary: '获取订单状态' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  findStatus(@Query('orderStatus') orderStatus: number[]) {
    return this.orderService.findByOrderStatus(orderStatus.map(Number));
  }

  @Get('/allInfo')
  @ApiOperation({ summary: '获取所有订单信息' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  findAllInfo() {
    return this.orderService.allInfo();
  }

  @Get('byUserId')
  @ApiOperation({ summary: '获取用户订单' })
  @UseGuards(JwtAuthGuard)
  findByUserId(@User('userId') userId:string){
    return this.orderService.findByUserId(+userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个订单' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get('list/:id')
  @ApiOperation({ summary: '获取订单列表' })
  @UseGuards(JwtAuthGuard)
  findOrderList(@Param('id') id: string) {
    return this.OderlistService.findOrderList(+id);
  }

  @Get('total/:id')
  @ApiOperation({ summary: '获取订单总价' })
  @UseGuards(JwtAuthGuard)
  getTotalPrice(@Param('id') id: string) {
    return this.orderService.totalPrice(+id);
  }

  @Post('payByBalance/:id')
  @ApiOperation({ summary: '余额支付' })
  @UseGuards(JwtAuthGuard)
  payByBalance(@Param('id') id: string, @User('userId') userId:number) {
    return this.orderService.payByBalance(+id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新订单' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除订单' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
