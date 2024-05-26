import { Injectable } from '@nestjs/common';
import { OrdersDetailsRepository } from './orders-details.repository';
import IOrderDetailDto from './orders-detailsDto';

@Injectable()
export class OrdersDetailsService {
    constructor(private readonly ordersDetailsRepository: OrdersDetailsRepository) {}

    getOrderDetailsById(id: string) {
        return this.ordersDetailsRepository.getOrderDetailsByID(id);
    }

    createOrderDetails(orderDetails: IOrderDetailDto) {
        return this.ordersDetailsRepository.createOrderDetails(orderDetails);
    }
}
