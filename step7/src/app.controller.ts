import { Request, Response } from 'express';
import { Controller, All, Res, Req, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @All('initSession')
  세션설정(@Req() req: Request, @Res() res: Response): void {
    let session : any = req.session;
    session.number = 1234;
    session.string = 'abcd';
    session.object = {array:[1,2,3,4], str : 'good'};   
    session.cookie.maxAge = 1000 * 10;
    res.status(HttpStatus.OK).send({ init : session != undefined });
  }

  @All('showSession')
  세션보기(@Req() req: Request, @Res() res: Response): void {
    let session : any = req.session;
    console.log(session)
    res.status(HttpStatus.OK).send({ yourSession: session });
  }  

}
