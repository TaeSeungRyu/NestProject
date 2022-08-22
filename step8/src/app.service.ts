import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//정보에 대한 타입입니다
export type User = {
  userIndex?: number;
  username: string;
  password?: string;
  role: string;
};

@Injectable()
export class AppService {


  constructor(private jwtService: JwtService){

  }

  //저장된 공간 입니다
  private readonly DATA_BASE: Array<any> = [
    {
      userIndex: 1,
      username: 'admin',
      password: '1234',
      role: ['super'],
    },
    {
      userIndex: 2,
      username: 'user',
      password: '1234',
      role: ['normal'],
    },
    {
      userIndex: 2,
      username: 'user',
      password: '1234',
      role: ['normal', 'semiSuper'],
    }
  ];

  //정보를 찾습니다.
  async findInformation(username: string, password: string): Promise<User> {
    return this.DATA_BASE.find(
      (arg) => arg.username === username && arg.password === password
    );
  }

  //토큰을 발행 합니다.
  async createToken(user: User): Promise<any> {
    const payload = { username: user.username, userIndex: user.userIndex, role : user.role };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }  
}
