import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from '../products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRespository: OrdersRepository) {}

  getOrders(id: string) {
    return this.ordersRespository.getOrder(id);
  }

  addOrder(userId: string, products: Partial<Product>[]) {
    return this.ordersRespository.addOrder(userId, products);
  }
}
