import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AddOrderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const { user, ...orderWithoutUser } = data.order;
        data.order = orderWithoutUser;
        const { products, ...orderDetailWithoutProducts } =
          data.order.orderDetail;
        data.order.orderDetail = orderDetailWithoutProducts;
        return data;
      }),
    );
  }
}
