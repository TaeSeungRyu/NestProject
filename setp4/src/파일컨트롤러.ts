import { Request, Response } from 'express';
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  Req,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { 멀터옵션 } from './app.멀터옵션';

@Controller()
export class 파일컨트롤러 {
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor(멀터옵션))
  upload(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Req() req: Request,
    @Res() res: Response,
  ): any {
    console.log(file); //저장된 파일정보가 출력 됩니다.
    return { succ: true };
  }
}
