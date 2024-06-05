import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddOrderInterceptor } from '../interceptors/addOrder.interceptor';
import { GetOrderInterceptor } from '../interceptors/getOrder.interceptor';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(GetOrderInterceptor)
  getOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(AddOrderInterceptor)
  addOrder(@Body() cartInfo: CreateOrderDto ) {
    const { userId, products } = cartInfo
    return this.ordersService.addOrder(userId, products);
  }
}
