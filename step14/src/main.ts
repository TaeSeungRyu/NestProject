import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}
bootstrap();

//#1. 이벤트 에미터
//npm install @nestjs/event-emitter

//#2. 스케줄
//npm install @nestjs/schedule
//npm install -dev @types/cron