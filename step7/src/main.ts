import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session'; //나 세션~

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'MY_SESSION_ID',
      resave: false,  //세션이 수정되지 않아도 지속적으로 저장하게 하는 옵션
      saveUninitialized: false,  //초기화되지 않는 세션을 저장하게 함
    }),
  );  
  await app.listen(3000);
}
bootstrap();
