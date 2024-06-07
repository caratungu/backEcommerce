import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Product } from '../../products/entities/products.entity';

export class OrderDetailDto {
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @ApiProperty({
    description: 'Se refiere al valor total de la orden.',
    example: 450.48,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'Arreglo con información de los productos añadidos a la orden.',
    example: [],
  })
  products: Product[];
}
