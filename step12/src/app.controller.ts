import { Response } from 'express';
import {
  Controller,
  All,
  Res
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
 
  constructor(private readonly service: AppService) {
    service.gogoTransaction()
  }

  @All('getValue') 
  값가져오기(@Res() res: Response): void {
    this.service.select().then( (arg)=>{
      res.send({ result: arg });
    }).catch( error=>{
      console.log(error)
      res.send({ result: error });
    });
  }


  publics(){
    
  }
}
