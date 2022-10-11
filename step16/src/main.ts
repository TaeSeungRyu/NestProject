import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { http모듈 } from './http모듈';

async function bootstrap() {
  
  //#1. mqtt 어플리케이션으로 사용
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.MQTT,  //사용할 종류
    options: {
      host: 'localhost',
      port: 1883,
    }
  });
  app.listen();

  //#2. http서버로 사용
  const httpApp = await NestFactory.create<NestExpressApplication>(http모듈);
  await httpApp.listen(8080);
}
bootstrap();

//마이크로서비스
//npm install @nestjs/microservices

//mqtt서버
//npm install mqtt