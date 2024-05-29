import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JsonToJS } from 'src/utils/jsonToJS';

@Injectable()
export class PreloadCategoriesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    let products = req.body;
    if (Object.keys(products).length === 0) {
      products = JsonToJS('productsDB.json')
    }
    const categories: string [] = products.map((product) => product.category);
    const setCategories = new Set(categories);
    const uniqueCategories = [];
    for (const element of setCategories) {
        uniqueCategories.push({ name: element})
    }
    req.body = uniqueCategories;
    return next.handle();
  }
}
