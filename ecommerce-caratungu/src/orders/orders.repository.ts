import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products.entity';
import { OrdersDetailsService } from '../ordersDetails/orders-details.service';
import { OrderDetail } from '../ordersDetails/orders-details.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersDetailsService: OrdersDetailsService,
  ) {}

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
      },
      relations: {
        orderDetail: {
          products: true
        }
      }
    });
    if (order) {
      return order;
    } else {
      throw new HttpException('No existe orden con el ID especificado', HttpStatus.BAD_REQUEST)
    }
  }

  async addOrder(userId: string, products: Partial<Product>[]) {
    try {
      const user = await this.usersService.getUserById(userId);
      let countProducts = 0
      for (const productId of products) {
        const product: Product = await this.productsService.getProductById(productId.id);
        if (product) {
          countProducts += 1;
        }
      }
      if (products.length === countProducts) {
        const newOrderDetail = { price: 0, products: []}
        for (const productId of products) {
          const product: Product = await this.productsService.getProductById(productId.id);
          if (product.stock > 0) {
            product.stock -= 1;
            newOrderDetail.price = Math.round((Number(newOrderDetail.price) + Number(product.price)+Number.EPSILON)*100)/100;
            await this.productsService.updateProduct(product)
            newOrderDetail.products.push(product)
          }
        }
        const orderDetails: OrderDetail = await this.ordersDetailsService.createOrderDetails(newOrderDetail)
        const newOrder = await this.ordersRepository.save({
            user,
            date: new Date(),
            orderDetail: orderDetails
        });
        return { order: newOrder }
      } else {
        throw new HttpException('Uno o más ID de productos no existen', HttpStatus.BAD_REQUEST);
        
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
