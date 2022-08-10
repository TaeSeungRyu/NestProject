import { Request, Response } from 'express';
import {
  Controller,
  Get,
  All,
  Res,
  Req,
  HttpStatus,
  Post,
  Query,
  Body,
  Param,
  UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { take } from 'rxjs/operators';
import { 일반인터셉터 } from './app.일반인터셉터';
type MyDataType = {
  name: string;
  phone: number;
  day: Date;
  yourData?: any;
};

@Controller()
export class AppController {
  private TV: any;
  constructor(private readonly appService: AppService) {
    this.TV = appService.TV;
  }

  @UseInterceptors(일반인터셉터)
  @Get() //get방식 요청에 응답 합니다. 값이 비어있으면 기본 루트를 의미 합니다.
  getHello(): string {
    return this.appService.getHello();
  }

  @All('hello') // http:x.x.x.x:3000/hello 요청에 응답합니다.(get, post 방식 등)
  모든요청(@Req() req: Request, @Res() res: Response): void {
    //post 방식 파라미터 받는 방법 : req.body
    //get 방식 파라미터 받는 방법 : req.query
    const param = req?.body?.length ? req.body : req.query;
    res.status(HttpStatus.OK).send({ yourData: param });
  }

  @All('json') // 지정된 형식으로 반환
  Json으로리턴(@Req() req: Request): MyDataType {
    const param = req?.body?.length ? req.body : req.query;
    return { name: 'name', phone: 1234, day: new Date(), yourData: param };
  }

  @All('array') // 배열로 반환
  Array으로리턴(): Array<any> {
    return [1, 2, 3, 4, 5];
  }

  @All('changeData') //서비스의 데이터 바꿔보기
  서비스Data바꿔보기(): any {
    this.appService.myData = '컨트롤러에서바꾼데이터';
    return { result: true };
  }

  @All('addItem') //데이터 추가하는 메서드
  데이터를쌓아두기(@Res() res: Response): void {
    this.appService.addData([{ a: 1, b: 2 }]); //데이터를 발행합니다!
    res.send({ result: 'ok' });
  }

  @All('getItem') // 배열로 반환
  쌓인데이터가져가기(@Res() res: Response): void {
    this.appService.TV.pipe(take(1)).subscribe((arg) => {
      console.log('기존 컨트롤러에서 동작 했습니다 : ', arg);
      res.send(arg);
    });
  }

  @Get('get') // http:x.x.x.x:3000/get 요청에 응답합니다.(get 방식)
  get요청(@Query() req, @Res() res: Response): void {
    res.send({ yourData: req });
  }

  @Get('get2/:data') // http:x.x.x.x:3000/get2/사용자가보낸값 요청에 응답합니다.(get 방식)
  urlMapping요청(@Param('data') req: string, @Res() res: Response): void {
    res.send({ yourData: req });
  }

  @Post('body') // http:x.x.x.x:3000/body 요청에 응답합니다.(post 방식)
  body요청(@Body() req, @Res() res: Response): void {
    res.send({ yourData: req });
  }
}
