import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class 다른컨트롤러 {
  constructor(private readonly appService: AppService) {
    this.appService.TV.pipe().subscribe((arg) => {
      console.log('다른컨트롤러에서 동작 했습니다 : ', arg);
    });
  }

  @Get('other') //myData가 변하는지 확인하는 주소 입니다.
  getHello(): string {
    return this.appService.myData;
  }
}
