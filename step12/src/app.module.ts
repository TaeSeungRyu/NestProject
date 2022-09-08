import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {모델} from './모델';
import {모델2} from './모델2';

@Module({
  imports: [    
    SequelizeModule.forRoot({  //1. 시퀄라이즈 모듈에 데이터베이스 설정
      dialect: 'postgres',  //가능한 데이터베이스 : mysql, mariadb, sqlite, postgres, mssql
      host: 'localhost',
      port: 12345, //포트번호
      username: '접속아이디',
      password: '비밀번호',
      database: '데이터베이스이름',
      models: [모델, 모델2],
    }),
    SequelizeModule.forFeature([모델, 모델2])//2. 시퀄라이즈 모듈에 사용할 모델을 지정
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
