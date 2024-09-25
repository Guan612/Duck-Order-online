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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cartDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { OderlistService } from 'src/oderlist/oderlist.service';
import { User } from 'src/user/decorator/user.decorator';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly oderlistService: OderlistService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建购物车' })
  create(@User('userId') userId:string) {
    return this.cartService.create(+userId);
  }

  @Get()
  @ApiOperation({ summary: '查询购物车' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.cartService.findAll();
  }

  @Get('/byUserId')
  @ApiOperation({ summary: '根据用户id查询购物车' })//id通过token获取
  @UseGuards(JwtAuthGuard)
  findOne(@User('userId') userId: string) {
    return this.cartService.findOne(+userId);
  }

  // @Get(':orderId')
  // @ApiOperation({ summary: '根据订单id查询购物车' })
  // @UseGuards(JwtAuthGuard)
  // findOneByOrderId(@Param('orderId') orderId: string) {
  //   return this.oderlistService.findByOrderId(+orderId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
