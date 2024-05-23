import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(req: Request) {
  const { email, name, password, address, phone, country, city } = req.body;
  return email && name && password && address && phone && country && city;
}

@Injectable()
export class ReqUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return validateRequest(req);
  }
}
