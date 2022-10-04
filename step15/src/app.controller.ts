import { Request, Response } from 'express';
import { Controller, All,   Res, Req, HttpStatus, Inject } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WisLog } from 'winston';


@Controller()
export class AppController {

  private readonly log = new Logger(AppController.name);

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly log2: WisLog){  

    this.log.debug('default log','asdf');
    this.log.error('default log', {asdf:1234,text:'asdfasdf'});
    console.log('---');
    this.log2.debug('debug','일반문자열');
    this.log2.error('error',{asdf:1234,text:'asdfasdf'});    
      
  }

  @All('/')
  default(@Req() req: Request, @Res() res: Response){
    res.status(HttpStatus.OK).send({ result : 1234 });
  }  
 
}

