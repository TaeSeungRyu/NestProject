import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { 다른컨트롤러 } from './app.다른컨트롤러';
import { AppService } from './app.service';
import { 디비모듈Module } from './디비모듈/디비모듈.module';
import { 일반인터셉터 } from './app.일반인터셉터';

//모듈인터셉터 설정--
import { 모듈인터셉터 } from './app.모듈인터셉터';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { 일반가드 } from './app.일반가드';


@Module({
  imports: [디비모듈Module],
  controllers: [AppController, 다른컨트롤러],
  providers: [AppService, 일반인터셉터,{ provide: APP_INTERCEPTOR, useClass: 모듈인터셉터 }, 일반가드],
})
export class AppModule {}
