import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { 다른컨트롤러 } from './app.다른컨트롤러';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, 다른컨트롤러],
  providers: [AppService],
})
export class AppModule {}
