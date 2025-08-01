import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors(); // 允许跨域
  app.setGlobalPrefix('apis', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
    ],
  });
  const config = new DocumentBuilder()
    .setTitle('鸭鸭点餐')
    .setDescription('鸭鸭点餐api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //静态文件路径
  app.useStaticAssets('upload', { prefix: '/upload' });

  app.useGlobalPipes(new ValidationPipe()); // 全局验证

  await app.listen(3000);
}
bootstrap();
