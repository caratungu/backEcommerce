import { Injectable } from '@nestjs/common';
import { OrdersDetailsRepository } from './orders-details.repository';
import { OrderDetailDto } from './dtos/orders-details.dto';

@Injectable()
export class OrdersDetailsService {
  constructor(
    private readonly ordersDetailsRepository: OrdersDetailsRepository,
  ) {}

  getOrderDetailsById(id: string) {
    return this.ordersDetailsRepository.getOrderDetailsByID(id);
  }

  createOrderDetails(orderDetails: OrderDetailDto) {
    return this.ordersDetailsRepository.createOrderDetails(orderDetails);
  }
}
