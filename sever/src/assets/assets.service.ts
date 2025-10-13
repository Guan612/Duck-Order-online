import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/asset.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}
  async create(createAssetDto: CreateAssetDto) {
    const res = await this.prisma.assets.create({
      data: createAssetDto,
    });

    return res;
  }

  async findAll() {
    const res = await this.prisma.assets.findMany();
    return res;
  }

  async findOne(id: number) {
    
  }

  update(id: number, updateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
