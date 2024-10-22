import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrderDetailDto } from './dtos/orders-details.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';

@ApiTags('Orders Details')
@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderDetailsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersDetailsService.getOrderDetailsById(id);
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  createOrderDetails(@Body() orderDetails: OrderDetailDto) {
    return this.ordersDetailsService.createOrderDetails(orderDetails);
  }
}
