import { Request } from 'express';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector){
        super();
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        const request : Request = context.switchToHttp().getRequest<Request>();

        const requiredRoles = this.reflector.getAllAndOverride('roles',[context.getHandler(), context.getClass()]);  //커스텀 데코레이터에게 넘어온 페이지 권한
        console.log(requiredRoles);

        let roles : Array<any> = user?.role;
        if(!roles) throw new UnauthorizedException();  //권한값이 있는지 확인 합니다.

        let amIOK = false;
        roles.forEach(b => {
            let check = requiredRoles.find( a=> a === b);  //해당 권한이 해당 페이지에 접근 가능하다면 
            if(check) amIOK = true;
        });

        if(! amIOK) throw new UnauthorizedException();  //접근 불가능한 사용자가 온 경우라면

        return user;
    }
}
