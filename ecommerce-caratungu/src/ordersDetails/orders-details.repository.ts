import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './orders-details.entity';
import { Repository } from 'typeorm';
import IOrderDetailDto from './orders-detailsDto';

@Injectable()
export class OrdersDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private ordersDetailsRepository: Repository<OrderDetail>,
  ) {}

  async getOrderDetailsByID(id: string) {
    return await this.ordersDetailsRepository.findOne({
      where: { id },
    });
  }

  async createOrderDetails(orderDetails: IOrderDetailDto) {
    const newOrderDetail = await this.ordersDetailsRepository.save(orderDetails);
    return newOrderDetail;
  }
}
