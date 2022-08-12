import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class 일반인터셉터 implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('메소드 단위 인터셉터 동작');
    return next
      .handle()
      .pipe(tap(() => console.log(`메소드 단위 인터셉터 실행 후`)));
  }
}
