import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class AppService {
  constructor(private event: EventEmitter2) {}

  //#1. rxjs 형식
  private FACTORY: BehaviorSubject<any> = new BehaviorSubject([]); //발행기관
  public readonly TV: Observable<any> = this.FACTORY.asObservable(); //발행 기관에서 구독기관 만들기

  //데이터 발행하기
  public addDataRxjs(info?: any): void {
    this.FACTORY.next([...this.FACTORY.value, info]);
  }

  //#2. event-emitter 방식의 데이터 전달
  public addDataEmitter(eventName : string, data : any) {
    this.event.emit(eventName, data);
  }

}
