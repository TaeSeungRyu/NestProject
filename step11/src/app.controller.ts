import { Request, Response } from 'express';
import { Controller, All,   Res, Req, HttpStatus } from '@nestjs/common';


@Controller()
export class AppController {

  @All('/')
  default(@Req() req: Request, @Res() res: Response){
    res.status(HttpStatus.OK).send({ result : 1234 });
  }  
 
}

