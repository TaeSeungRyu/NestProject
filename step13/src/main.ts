import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //NestExpressApplication
  await app.listen(3000);
}
bootstrap();

//npm install --save @nestjs/mongoose mongoose