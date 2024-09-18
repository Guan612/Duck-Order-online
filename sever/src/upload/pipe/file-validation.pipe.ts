import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    return value.size < this.configService.get('FILE_SIZE_LIMIT');
  }
}
