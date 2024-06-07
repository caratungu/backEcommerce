import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { OrdersDetailsModule } from '../ordersDetails/orders-details.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule, ProductsModule, OrdersDetailsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
