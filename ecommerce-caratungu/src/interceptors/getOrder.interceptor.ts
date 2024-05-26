import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GetOrderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(data => {
        const productsNames: string[] = []
        for (const product of data.orderDetail.products) {
            productsNames.push(product.name)
        }
        data.orderDetail.products = productsNames;
        return data
    }))
  }
}

