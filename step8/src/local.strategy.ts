import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private service: AppService) {
    super();
  }

  //사용자 요청에서 username과 password 값을 받습니다.
  async validate(username: string, password: string): Promise<any> {
    const user = await this.service.findInformation(username, password);
    console.log('조회 결과 : ',user);
    if (!user) throw new UnauthorizedException();
    //return user;
    return this.service.createToken(user);  //토큰을 리턴하게 합니다.
  }
}
