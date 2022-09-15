import { Response } from 'express';
import { Controller, All, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @All('getValue')
  값가져오기(@Res() res: Response): void {}

}
