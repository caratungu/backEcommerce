import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Min, MinLength } from "class-validator";

export class CreateProductDto {
  /**
   *Debe registrar el nombre del producto con un mínimo de 5 carácteres.
   *@example 'Producto 01'
   */
  @Length(5, 50, { message: 'El país debe tener entre 5 y 20 carácteres' })
  name: string;

  /**
   *Debe registrar una descripción del producto con mínimo 5 carcácteres.
   *@example 'Descripción del producto 01'
   */
  @MinLength(5)
  description: string;

  /**
   *El precio del producto es  un número con máximo dos cifras decimales.
   *@example 15.35
   */
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2
  })
  price: number;

  /**
   *El stock corresponde a un numero entero mayor o igual a cero.
   *@example 12
   */
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;
  
  /**
   *Url de la imagen, debe corresponder con una imagen en formato válido (jpg-jpeg-png-webp-gif-svg).
   *@example 'https://res.cloudinary.com/du92uyaqq/image/upload/v1716950165/ecommerce/productTecno_hm2bub.jpg'
   */
  @IsNotEmpty()
  @IsString()
  imgUrl: string;
  
  /**
   *La categoría dede ser un valor existente en la tabla de categorías
   *@example smartphone
   */
  @IsNotEmpty()
  @IsString()
  category: string;
}
