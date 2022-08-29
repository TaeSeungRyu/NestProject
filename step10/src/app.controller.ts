import { Request, Response } from 'express';
import { Controller, All,   Get, Res, Req, UsePipes, HttpStatus, Body, Query } from '@nestjs/common';
import { 파이프클래스 } from './파이프클래스';
import {Expose} from "class-transformer";

class 데이터구조{
  @Expose() id : any;
  @Expose() name : any;
  @Expose() desc : any;
}

@Controller()
export class AppController {

  @All('normal')
  normal(@Req() req: Request, @Res() res: Response){
    res.status(HttpStatus.OK).send({ yourData: 1234 });
  }  

  @Get('pipe')
  @UsePipes(new 파이프클래스(데이터구조))
  파이프사용(@Query() data : 데이터구조,@Req() req: Request, @Res() res: Response){
    console.log('data : ',data);
    console.log('query : ',req.query);
    res.status(HttpStatus.OK).send({ yourData: data });
  }  
}

