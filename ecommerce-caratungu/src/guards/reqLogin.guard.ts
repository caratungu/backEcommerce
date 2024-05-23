import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(req: Request) {
  const { email, password } = req.body;
  return email && password;
}

@Injectable()
export class ReqLoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return validateRequest(req);
  }
}
