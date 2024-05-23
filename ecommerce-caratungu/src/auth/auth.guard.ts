import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(req: Request) {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    throw new UnauthorizedException('No se encuentra header de autorización');
  }

  let auth: string;

  if (Array.isArray(authorization)) {
    auth = authorization[0];
  } else {
    auth = authorization;
  }

  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Basic') {
    throw new UnauthorizedException(
      'Formato de header de autorización inválido',
    );
  }

  const [email, password] = parts[1].split(':');
  if (!email || !password) {
    throw new UnauthorizedException(
      'Contenido de header de autorización inválido',
    );
  }

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return validateRequest(req);
  }
}
