import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { 웹소켓어뎁터 } from './웹소켓어뎁터'

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [웹소켓어뎁터],
})
export class AppModule {}
