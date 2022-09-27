import { Request, Response } from 'express';
import { Controller, All,   Res, Req, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {

  constructor(private service : AppService){  
    let data = {name:'text', number : 12345};
    this.service.addDataRxjs(data);
    this.service.addDataEmitter('event1', data);
  }

  @All('/')
  default(@Req() req: Request, @Res() res: Response){
    res.status(HttpStatus.OK).send({ result : 1234 });
    let data = {name:'text', number : 12345};
    this.service.addDataRxjs(data);
    this.service.addDataEmitter('event1', data);
  }  
 
}

