import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la categoría que se desea registrar.',
    example: 'Nombre categoría'
  })
  name: string;
}