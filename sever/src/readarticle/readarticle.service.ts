import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReadarticleService {
  constructor(private prisma: PrismaService) {}
  addReadArticle(articleId: number, userId: number) {
      
  }
}
