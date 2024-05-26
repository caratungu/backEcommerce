import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRespository: OrdersRepository) {}

  getOrders(id: string) {
    return this.ordersRespository.getOrder(id);
  }

  addOrder(userId: string, products: any[]) {
    return this.ordersRespository.addOrder(userId, products)
  }
}
