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
import { ArticleService } from './article.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/decorator/user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-user.guard';
import { Role } from 'src/user/dto/role';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorator/roles.decorator';

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: '创建文章' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  create(@Body() createArticleDto, @User('userId') userId: string) {
    createArticleDto.authorId = userId;
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有文章' })
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定文章' })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新文章' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  update(@Param('id') id: string, @Body() updateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.waiter)
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
