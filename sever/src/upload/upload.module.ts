import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
@Module({
  imports: [],
  controllers: [UploadController],
  providers: [ConfigService, UploadService],
})
export class UploadModule {}
