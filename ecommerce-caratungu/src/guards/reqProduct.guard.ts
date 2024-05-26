import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(req: Request) {
  const { name, description, price, stock, imgUrl } = req.body;
  if (!name || !description || !price || !imgUrl || typeof(stock) !== 'boolean') {
    throw new UnauthorizedException ('Información incompleta')
  }
  return true;
}

@Injectable()
export class ReqProductGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return validateRequest(req);
  }
}
