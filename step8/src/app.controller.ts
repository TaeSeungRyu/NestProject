import { Request, Response } from 'express';
import { Controller, All, Res, Req, HttpStatus, UseGuards, Request as reqs  } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { 권한관련커스텀데코레터 } from './new.커스텀데코레더';

@Controller()
export class AppController {

  constructor() {}

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
    res.status(HttpStatus.OK).send({ yourSession: session });
  }  

  @UseGuards(LocalAuthGuard)
  @All('tryLogin')
  async login(@reqs() req) {   //로그인이 성공하면 JWT값이 반환 됩니다!
    return req.user;
  }

/**
 * 헤더 (Authorization : Bearer 블라블라)
 *  - 키 : Authorization
 *  - 값 : Bearer 발급받은값
 */
  @UseGuards(JwtAuthGuard)
  @All('profile')
  async 프로필(@reqs() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @All('superOrSemi')
  async 슈퍼또는세미(@reqs() req) {
    return req.user;
  }


  @권한관련커스텀데코레터('super','normal')
  @All('superAndNormal')
  async 슈퍼와노말만(@reqs() req) {
    return req.user;
  }

  @권한관련커스텀데코레터('super')
  @All('onlySuper')
  async 오직슈퍼유저만(@reqs() req) {
    return req.user;
  }  
}
