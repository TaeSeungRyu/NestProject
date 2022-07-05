import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { 다른컨트롤러 } from './app.다른컨트롤러';
import { AppService } from './app.service';
import { 디비모듈Module } from './디비모듈/디비모듈.module';

@Module({
  imports: [디비모듈Module],
  controllers: [AppController, 다른컨트롤러],
  providers: [AppService],
})
export class AppModule {}
