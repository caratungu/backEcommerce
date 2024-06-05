import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { confirmPass, ...userInfo } = req.body;
    if (userInfo.password === confirmPass) {
        req.body = userInfo;
        return next.handle();
    } else {
        throw new BadRequestException('Las contraseñas no coinciden')
    }
  }
}
