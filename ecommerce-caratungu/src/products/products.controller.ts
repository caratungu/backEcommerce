import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.productsService.getProducts(Number(page), Number(limit));
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: CreateProductDto,
  ) {
    const uProduct: Product = { id, ...product };
    return this.productsService.updateProduct(uProduct);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('seeder')
  preloadProducts(@Body() products: CreateProductDto[]) {
    return this.productsService.preloadProducts(products);
  }
}
