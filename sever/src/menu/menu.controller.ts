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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/menuDto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/role';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  @ApiOperation({ summary: '创建菜品' })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const { name } = await this.menuService.create(createMenuDto);
    return {
      message: '创建成功',
      name,
    };
  }

  @Get()
  @ApiOperation({ summary: '获取所有菜品' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get('/search')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '通过名称搜索菜品' })
  search(@Body() body: { menuName: string }) {
    return this.menuService.search(body.menuName);
  }

  @Get('/searchType')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '通过类型搜索菜品' })
  searchType(@Body() body: { menuType: number }) {
    return this.menuService.searchByType(body.menuType);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过id获取单个菜品' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  @ApiOperation({ summary: '更新菜品' })
  update(@Param('id') id: string, @Body() updateMenuDto: any) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  @ApiOperation({ summary: '删除菜品' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
