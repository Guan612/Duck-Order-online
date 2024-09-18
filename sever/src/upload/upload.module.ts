import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
