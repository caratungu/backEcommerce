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
      return next.handle().pipe(map(data => {
        const { user, ...orderWithoutUser } = data.order
        data.order = orderWithoutUser;
        const { products, ...orderDetailWithoutProducts } = data.order.orderDetail;
        data.order.orderDetail = orderDetailWithoutProducts;
        return data
    }));
  }
}

// {
//     "order": {
//       "user": {
//         "id": "aa96633b-45a3-4267-92af-800e5523549d",
//         "email": "alice.brown@example.com",
//         "name": "Alice Brown",
//         "address": "123 Elm St",
//         "phone": 555111222,
//         "country": "USA",
//         "city": "New York",
//         "orders": [
//           {
//             "id": "d2b5cf6f-9428-4240-a2c4-a8c8bfe9236b",
//             "date": "2024-05-26T16:38:29.725Z"
//           },
//           {
//             "id": "4a00f97a-6d53-49ca-8b5d-95c215a474b5",
//             "date": "2024-05-26T17:16:39.319Z"
//           },
//           {
//             "id": "bc24cfdc-dcf0-4431-a2af-4e3d71a651e5",
//             "date": "2024-05-26T17:44:07.507Z"
//           }
//         ]
//       },
//       "date": "2024-05-26T17:45:01.552Z",
//       "orderDetail": {
//         "price": 529.88,
//         "products": [
//           {
//             "id": "07c94e09-49e2-4fe9-be9a-2bb85523d051",
//             "name": "Iphone 15",
//             "description": "The best smartphone in the world",
//             "price": "199.99",
//             "stock": 8,
//             "imgUrl": "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
//           },
//           {
//             "id": "075949b4-e6a7-4b7a-80c1-1773d20fb51d",
//             "name": "Samsung Galaxy S23",
//             "description": "The best smartphone in the world",
//             "price": "150.00",
//             "stock": 8,
//             "imgUrl": "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
//           },
//           {
//             "id": "91e2cc84-e417-4447-9da7-1051f688cdfb",
//             "name": "Motorola Edge 40",
//             "description": "The best smartphone in the world",
//             "price": "179.89",
//             "stock": 8,
//             "imgUrl": "https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg"
//           }
//         ],
//         "id": "0db4b710-8b4c-42e0-a4d1-75252ef95a5f"
//       },
//       "id": "50253457-daaf-4b6f-948e-9ed704a9be13"
//     }
//   }