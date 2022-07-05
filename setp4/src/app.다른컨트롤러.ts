import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { 디비모듈에있는기능 } from './디비모듈/디비모듈에있는기능';
@Controller()
export class 다른컨트롤러 {
  constructor(
    private readonly appService: AppService,
    private readonly 다른모듈에서온기능: 디비모듈에있는기능,
  ) {
    this.appService.TV.pipe().subscribe((arg) => {
      console.log('다른컨트롤러에서 동작 했습니다 : ', arg);
    });
  }

  @Get('other') //myData가 변하는지 확인하는 주소 입니다.
  getHello(): string {
    return this.appService.myData;
  }

  @Get('addData') //외부모듈을 사용 해 봅니다!
  addData(): string {
    this.다른모듈에서온기능.dbData = '1234';
    return 'succ';
  }

  @Get('getData') //외부모듈을 사용 해 봅니다!
  getData(): any {
    return this.다른모듈에서온기능.dbData;
  }
}
