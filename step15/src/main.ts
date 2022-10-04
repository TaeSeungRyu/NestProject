import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LogLevel } from '@nestjs/common';


async function bootstrap() {
  let error : LogLevel = 'error',worn : LogLevel = 'warn',  debug : LogLevel = 'debug';
  const app =  await NestFactory.create<NestExpressApplication>(AppModule,{logger : [error, worn, debug]});
  await app.listen(3000);
}
bootstrap();

//윈스턴
//npm install --save nest-winston winston