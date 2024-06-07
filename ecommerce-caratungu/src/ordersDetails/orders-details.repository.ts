import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orders-details.entity';
import { Repository } from 'typeorm';
import { OrderDetailDto } from './dtos/orders-details.dto';

@Injectable()
export class OrdersDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private ordersDetailsRepository: Repository<OrderDetail>,
  ) {}

  async getOrderDetailsByID(id: string) {
    const orderDetails = await this.ordersDetailsRepository.findOne({
      where: { id },
    });
    if (orderDetails) {
      return orderDetails;
    } else {
      throw new HttpException('No existe ningún detalle de orden con el ID indicado', HttpStatus.BAD_REQUEST)
    }
  }

  async createOrderDetails(orderDetails: OrderDetailDto) {
    try {
      const newOrderDetail =
        await this.ordersDetailsRepository.save(orderDetails);
      return newOrderDetail;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
