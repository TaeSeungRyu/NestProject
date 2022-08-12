import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class 글로벌인터셉터 implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('글로벌인터셉터 동작 ');
    /*    
    const { method, url } = context.getArgByIndex(0);
    const http = context.switchToHttp();
    const request = http.getRequest();
    //파라미터를 받아서 사용하는 방법
    console.log(
      `글로벌 인터셉터 : ${method} ${url} body(post 방식) : ${JSON.stringify(
        request.body,
      )}  query(get 방식) : ${JSON.stringify(request.query)} `,
    );
     */
    return next.handle().pipe(tap(() => console.log(`글로벌인터셉터 실행 후`)));
  }
}
