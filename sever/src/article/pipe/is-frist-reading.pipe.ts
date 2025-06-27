import {
  PipeTransform,
  Injectable,
  HttpException,
  ArgumentMetadata,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IsFirstReadingPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}
