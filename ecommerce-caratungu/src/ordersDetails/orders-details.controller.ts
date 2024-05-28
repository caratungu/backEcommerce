import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrderDetailDto } from './dtos/orders-details.dto';

@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}

  @Get()
  getOrderDetailsById(@Param('id') id: string) {
    return this.ordersDetailsService.getOrderDetailsById(id);
  }

  @Post()
  createOrderDetails(@Body() orderDetails: OrderDetailDto) {
    return this.ordersDetailsService.createOrderDetails(orderDetails);
  }
}
