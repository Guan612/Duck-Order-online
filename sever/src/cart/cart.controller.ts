import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cartDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { User } from 'src/user/decorator/user.decorator';
import { CartlistService } from 'src/cartlist/cartlist.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartListService: CartlistService,
  ) {}

  @Get()
  @ApiOperation({ summary: '查询购物车' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.cartService.findAll();
  }

  @Get('/byUserId')
  @ApiOperation({ summary: '根据用户id查询购物车' }) //id通过token获取
  @UseGuards(JwtAuthGuard)
  findOne(@User('userId') userId: string) {
    return this.cartService.findByUserId(+userId);
  }

  @Post()
  @ApiOperation({ summary: '添加菜品' })
  @UseGuards(JwtAuthGuard)
  async create(@User('userId') userId: string, @Body() addCarListtDto) {
    const cartId = await this.cartService.findUserCart(+userId);
    return this.cartListService.addCartList(addCarListtDto, cartId);
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

  @Delete()
  remove(@Query('deletList') deletList: number[]) {
    return this.cartListService.removeCartList(deletList);
  }
}
