import { Injectable } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
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
    const res = await this.prisma.assets.findUnique({
      where: {
        id: id,
      },
    });

    return res;
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    const res = await this.prisma.assets.update({
      where: {
        id: id,
      },
      data: updateAssetDto,
    });

    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.assets.delete({
      where: {
        id: id,
      },
    });

    return res;
  }
}
