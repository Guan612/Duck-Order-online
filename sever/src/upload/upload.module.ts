import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      dest: process.env.UPLOAD_PATH || 'public', // 默认文件上传目录
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
