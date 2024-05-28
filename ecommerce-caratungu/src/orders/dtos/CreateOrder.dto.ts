import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Product } from 'src/products/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El userId no puede estar vacío' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  userId: string;

  @IsArray({ message: 'Los productos deben estar en un array' })
  @Type(() => Product)
  @IsNotEmpty({ each: true, message: 'El array de productos no puede estar vacío y debe contener al menos un elemento' })
  products: Partial<Product>[];
}
