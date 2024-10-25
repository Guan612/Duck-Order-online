import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: any) {
    const res = await this.prisma.article.create({
      data: createArticleDto,
    });

    return res;
  }

  async findAll() {
    const res = await this.prisma.article.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.article.findUnique({
      where: {
        id: id,
      },
    });

    return res;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
