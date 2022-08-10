import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { 에러필터 } from './에러필터';
import { Http에러필터 } from './Http에러필터';
import { 글로벌인터셉터 } from './app.글로벌인터셉터';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //NestExpressApplication
  app.useGlobalInterceptors(new 글로벌인터셉터());
  app.useGlobalFilters(new 에러필터(), new Http에러필터());
  await app.listen(3000);
}
bootstrap();
