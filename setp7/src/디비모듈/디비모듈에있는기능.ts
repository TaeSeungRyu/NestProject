import { Injectable } from '@nestjs/common';

@Injectable()
export class 디비모듈에있는기능 {
  private data: Array<any>;
  constructor() {
    this.data = new Array<any>();
  }

  set dbData(arg: any) {
    this.data.push(arg);
  }

  get dbData() {
    return this.data;
  }
}
