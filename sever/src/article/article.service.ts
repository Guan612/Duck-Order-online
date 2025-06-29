import { Injectable } from '@nestjs/common';
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

  update(id: number, updateArticleDto) {
    const res = this.prisma.article.update({
      where: {
        id: id,
      },
      data: updateArticleDto,
    });

    return res;
  }

  remove(id: number) {
    const res = this.prisma.article.delete({
      where: {
        id: id,
      },
    });
    return res;
  }
}
