import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { http컨트롤 } from './http컨트롤';


@Module({
  imports: [
    AppModule  //mqtt 모듈을 가져 옵니다.
  ],
  controllers: [http컨트롤],
  providers: [],
})
export class http모듈 {}
