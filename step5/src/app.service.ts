import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private data: any;

  getHello(): string {
    return 'Hello World!';
  }

  set myData(arg) {
    this.data = arg;
  }

  get myData() {
    return this.data;
  }

  private FACTORY: BehaviorSubject<any> = new BehaviorSubject([]); //발행기관
  public readonly TV: Observable<any> = this.FACTORY.asObservable(); //발행 기관에서 구독기관 만들기

  //데이터 발행하기
  public addData(info?: any): void {
    this.FACTORY.next([...this.FACTORY.value, info]);
  }
}
