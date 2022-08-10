import { Module } from '@nestjs/common';
import { 디비모듈에있는기능 } from './디비모듈에있는기능';

@Module({
  exports: [디비모듈에있는기능],
  providers: [디비모듈에있는기능],
})
export class 디비모듈Module {}
