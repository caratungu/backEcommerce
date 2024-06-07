import { Module } from '@nestjs/common';
import { OrdersDetailsController } from './orders-details.controller';
import { OrdersDetailsService } from './orders-details.service';
import { OrdersDetailsRepository } from './orders-details.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orders-details.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [OrdersDetailsController],
    providers: [OrdersDetailsService, OrdersDetailsRepository],
    exports: [OrdersDetailsService, TypeOrmModule]
})
export class OrdersDetailsModule {}
