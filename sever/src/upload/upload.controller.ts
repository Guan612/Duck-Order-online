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
import { extname, join } from 'path';
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
          const fileExt = extname(file.originalname).toLowerCase();

          // 从 .env 文件中读取允许的文件类型
          const allowedPicTypes = process.env.ALLOWED_PIC_TYPES.split(',');
          const allowedDocTypes = process.env.ALLOWED_DOC_TYPES.split(',');
          const allowedVideoTypes = process.env.ALLOWED_VIDEO_TYPES.split(',');

          // 根据文件后缀选择不同的目录
          if (allowedPicTypes.includes(fileExt)) {
            cb(null, process.env.PIC_PATH || './public/images');
          } else if (allowedDocTypes.includes(fileExt)) {
            cb(null, process.env.DOC_PATH || './public/pdfs');
          } else if (allowedVideoTypes.includes(fileExt)) {
            cb(null, process.env.VIDEO_PATH || './public/videos');
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
      throw new BadRequestException('文件上传失败');
    }

    // 拼接文件路径
    const filePath = join(file.destination, file.filename);
    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:3000/'; // 你可以设置自己的基础 URL
    const relativeUrl = filePath.replace(/\\/g, '/'); // 将反斜杠替换为斜杠
    const fullUrl = `${baseUrl}${relativeUrl}`;

    return {
      message: '文件上传成功',
      filePath: fullUrl, // 返回完整路径
    };
  }
}
