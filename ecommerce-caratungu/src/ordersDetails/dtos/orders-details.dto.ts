import { IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from 'src/products/products.entity';

export class OrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  products: Product[];
}
