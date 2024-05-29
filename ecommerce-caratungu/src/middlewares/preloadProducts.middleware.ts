import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Product } from 'src/products/products.entity';
import { JsonToJS } from 'src/utils/jsonToJS';

@Injectable()
export class PreloadProductsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let products: Product[] = req.body;
    if (Object.keys(products).length === 0) {
      products = JsonToJS('productsDB.json')
    }
    const productsNames: string[] = products.map((product) => product.name);
    const uniqueProductsNames = new Set(productsNames);
    if (productsNames.length === uniqueProductsNames.size) {
      req.body = products;
      next();
    } else {
      console.log('Dos o más Productos tienen el mismo nombre'); //! Arrojar error cuando sea el momento
    }
  }
}
