import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/userDto';
import { CheckUserExistsPipe } from './pipe/check-user-exists.pipe';
import { HashPasswordPipe } from './pipe/hash-password.pipe';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guards/jwt-user.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './dto/role';
import { CheckUserLoginRolePipe } from './pipe/check-user-login-role.pipe';
import { CartService } from 'src/cart/cart.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly cartService: CartService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '创建用户' })
  async create(
    @Body(CheckUserExistsPipe, HashPasswordPipe) createUserDto: CreateUserDto,
  ) {
    const { loginId,id } = await this.userService.create(createUserDto);
    //同时创建购物车
    const cart = await this.cartService.create(id);
    return { loginId };
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() body, loginDto: LoginUserDto) {
    const { loginId, password } = body;
    const res = await this.authService.validateUser(loginId, password);
    if (res) {
      return this.authService.login(res);
    } else {
      throw new HttpException('用户名或密码错误', 401);
    }
  }

  @Post('adminLogin')
  @ApiOperation({ summary: '管理员登录' })
  async adminLogin(@Body(CheckUserLoginRolePipe) body, loginDto: LoginUserDto) {
    const { loginId, password } = body;
    const res = await this.authService.validateUser(loginId, password);
    if (res) {
      return this.authService.login(res);
    } else {
      throw new HttpException('用户名或密码错误', 401);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
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
  update(@Param('id') id: string, @Body() updateUserData: UpdateUserDto) {
    //console.log(body);
    return this.userService.update(+id, updateUserData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
