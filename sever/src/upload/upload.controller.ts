import {
  BadRequestException,
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // 获取文件后缀
          const fileExt = extname(file.originalname).toLowerCase();

          // 根据文件后缀选择不同的目录
          if (fileExt === '.jpg' || fileExt === '.png') {
            cb(null, process.env.PIC_PATH || './public/images');
          } else if (fileExt === '.pdf' || fileExt === '.txt') {
            cb(null, process.env.PDF_PATH || './public/pdfs');
          } else {
            // 不支持的文件类型
            cb(new BadRequestException('不支持的文件类型'), null);
          }
        },
        filename: (req, file, cb) => {
          // 生成唯一文件名，防止文件名冲突
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File upload failed');
    }
    // 返回文件路径
    return {
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.filename}`,
    };
  }
}
