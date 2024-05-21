import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const currentDateTime: string = new Date().toLocaleDateString(
    'es-Co',
    options,
  );
  console.log(
    `Estás ejecutando un método ${req.method} en la ruta ${req.url} <---> ${currentDateTime}`,
  );
  next();
}
