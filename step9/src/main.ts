import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookie from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets('html폴더절대경로');
  app.use(cookie());
  app.use(csurf({cookie:{maxAge : 1000 * 60 * 5 }}));  //쿠키로 설정, 5분
  app.use((req: any, res: any, next: any) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);  // 키 값!
    res.locals.csrfToken = token;
    next();
  }); 

  await app.listen(3000);
}
bootstrap();
