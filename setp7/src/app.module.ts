import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { 디비모듈Module } from './디비모듈/디비모듈.module';

@Module({
  imports: [디비모듈Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
