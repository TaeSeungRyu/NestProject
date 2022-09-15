import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {내도큐먼트, 내스키마} from './내도큐먼트';

@Module({
  imports: [
    //아이디(id), 비밀번호(pwd)가 있는 경우 : mongodb://id:pwd@localhost:27017/내db
    MongooseModule.forRoot('mongodb://localhost:27017/내db', {  }),
    MongooseModule.forFeature([{name : 내도큐먼트.name, schema : 내스키마}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
