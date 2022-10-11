import { Request, Response } from 'express';
import { Controller, All, Res, Req, HttpStatus,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {take} from 'rxjs';

@Controller()
export class http컨트롤 {
  constructor(@Inject('MY_MQTT_SERVICE') private client : ClientProxy) {

  }

  @All('web')
  async normal(@Req() req: Request, @Res() res: Response) {
    //get 방식으로 데이터를 받아서 data 라는 키 값으로 mqtt서버로 전송하게 하였습니다.
    console.log(req.query)
    await this.client.send('Korean',{data:req.query}).pipe(take(1)).subscribe(()=>{
        console.log(1234)
    });
    res.status(HttpStatus.OK).send({ yourRequest: req.query });
  }
}
