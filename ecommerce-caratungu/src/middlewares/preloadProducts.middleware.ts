import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Product } from 'src/products/products.entity';

@Injectable()
export class PreloadProductsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const products: Product[] = req.body;
    const productsNames: string[] = products.map((product) => product.name);
    const uniqueProductsNames = new Set(productsNames);
    if (productsNames.length === uniqueProductsNames.size) {
      next();
    } else {
      console.log('Dos o más Productos tienen el mismo nombre'); //! Arrojar error cuando sea el momento
    }
  }
}
