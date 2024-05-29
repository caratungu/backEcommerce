import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/products.entity';

@Injectable()
export class FilesRepository {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productService: ProductsService,
  ) {}

  async saveFile(id: string, image: Express.Multer.File) {
    const product: Product = await this.productService.getProductById(id);
    if (product) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image);
      product.imgUrl = uploadedImage.url;
      await this.productService.updateProduct(product);
      return `Imagen almacenada correctamente para el producto ${product.name}`;
    } else {
      throw new HttpException(
        'No existe producto con el ID especificado, no es posible cargar la imagen',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
