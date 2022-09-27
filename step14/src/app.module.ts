import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import {AppService} from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { 이벤트를받는컨트롤러 } from './이벤트를받는컨트롤러';
import { 스케줄러 } from './스케줄러';

@Module({
  imports: [
    EventEmitterModule.forRoot(),    //이벤트에미터 사용
    ScheduleModule.forRoot()  //스케줄 사용
  ],
  controllers: [
    AppController,
    이벤트를받는컨트롤러
  ],
  providers: [AppService, 스케줄러 ],  //스케줄러
})
export class AppModule {}
