import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto, updateAssetDto } from './dto/asset.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('assets')
@ApiTags('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiOperation({ summary: '创建资产' })
  @ApiResponse({})
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Get()
  @ApiOperation({ summary: '获得资产列表' })
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个资产' })
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新单个资产' })
  update(@Param('id') id: string, @Body() updateAssetDto: updateAssetDto) {
    return this.assetsService.update(+id, updateAssetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除资产' })
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
