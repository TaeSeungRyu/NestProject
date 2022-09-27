import { Request, Response } from 'express';
import { Controller, All,   Res, Req, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { OnEvent } from '@nestjs/event-emitter';
@Controller()
export class 이벤트를받는컨트롤러 {

  constructor(private service : AppService){
    service.TV.subscribe( arg=>{
        console.log('이벤트를받는컨트롤러에서 rxjs 이벤트 수신 : ',arg);
    });
  }

  @All('/data')
  default(@Req() req: Request, @Res() res: Response){
    res.status(HttpStatus.OK).send({ result : 1234 });
  }  

  @OnEvent('event1')
  private reciver(arg : any) : void{
    console.log('이벤트를받는컨트롤러에서 event-emitter 이벤트(event1) 수신 : ',arg);
  }
 
  @OnEvent('event2')
  private reciver2(arg : any) : void{
    console.log('이벤트를받는컨트롤러에서 event-emitter 이벤트(event2) 수신 : ',arg);
  }  
}

