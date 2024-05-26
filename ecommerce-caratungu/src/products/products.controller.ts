import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ReqProductGuard } from 'src/guards/reqProduct.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import IProductDto from './productsDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string = '1', @Query('limit') limit: string = '5') {
    return this.productsService.getProducts(Number(page), Number(limit));
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(ReqProductGuard)
  createProduct(@Body() product: IProductDto) {
    return this.productsService.createProduct(product);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(ReqProductGuard)
  updateProduct(@Param('id') id: string, @Body() product: IProductDto) {
    const uProduct: Product = { id, ...product}
    return this.productsService.updateProduct(uProduct);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('seeder')
  preloadProducts(@Body() products) {
    return this.productsService.preloadProducts(products);
  }
}
