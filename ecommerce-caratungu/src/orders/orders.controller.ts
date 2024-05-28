import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddOrderInterceptor } from 'src/interceptors/addOrder.interceptor';
import { GetOrderInterceptor } from 'src/interceptors/getOrder.interceptor';
import { CreateOrderDto } from './dtos/CreateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseInterceptors(GetOrderInterceptor)
  getOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id);
  }

  @Post()
  @UseInterceptors(AddOrderInterceptor)
  addOrder(@Body() cartInfo: CreateOrderDto ) {
    const { userId, products } = cartInfo
    return this.ordersService.addOrder(userId, products);
  }
}
