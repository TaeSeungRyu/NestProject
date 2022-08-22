import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

export function 권한관련커스텀데코레터(...컨트롤러의_데코레이터에서온값들: any) {
  return applyDecorators(
    SetMetadata('roles', 컨트롤러의_데코레이터에서온값들),
    UseGuards(JwtAuthGuard),
  );
}
