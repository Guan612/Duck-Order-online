import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileSizeValidationPipe } from './pipe/file-validation.pipe';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}
  @Post('file')
  @ApiOperation({ summary: '上传文件' })
  @UseInterceptors(FileInterceptor('file', {}))
  uploadFile(@UploadedFile(FileSizeValidationPipe) file) {
    // 处理上传的文件
    return {
      message: 'File uploaded successfully',
      fileName: file.filename,
      path: file.path,
    };
  }
}
