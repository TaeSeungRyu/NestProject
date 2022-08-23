import { Request, Response } from 'express';
import { Controller, All, Res, Req, HttpStatus} from '@nestjs/common';

@Controller()
export class AppController {

  @All('getCsrf')
  겟방식엔관대하다(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).send({ result : 'ok' });
  }  

}
