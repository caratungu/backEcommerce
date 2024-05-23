import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(req: Request) {
  const { name, description, price, stock, imgUrl } = req.body;
  if (typeof(stock) === 'boolean') {
    return name && description && price && imgUrl;
  } else {
    return false
  }
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
