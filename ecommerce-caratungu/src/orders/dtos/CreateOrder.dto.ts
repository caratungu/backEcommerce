import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Product } from 'src/products/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El userId no puede estar vacío' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  @ApiProperty({
    description: 'Se debe indicar el id del usuario de tipo UUID v4 válido.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  userId: string;

  @IsArray({ message: 'Los productos deben estar en un array' })
  @Type(() => Product)
  @IsNotEmpty({ each: true, message: 'El array de productos no puede estar vacío y debe contener al menos un elemento' })
  @ApiProperty({
    description: 'Se espera un arreglo, cuyos elementos seran Partial<Product>, particularmente el id del producto.',
    example: [{"id":"4db0f6b8-43fb-4950-ad8a-75928ea5487a"},{"id":"efdc43be-21ff-4b3d-bac9-1d027a7aa89d"}]
  })
  products: Partial<Product>[];
}
