import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/products.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly productsService: ProductsService,
  ) {}

  async saveFile(id: string, image: Express.Multer.File) {
    const product: Product = await this.productsService.getProductById(id);
    if (product) {
      const uploadedImage = await this.filesRepository.saveFile(image);
      product.imgUrl = uploadedImage.secure_url;
      await this.productsService.updateProduct(product);
      return `Imagen almacenada correctamente para el producto ${product.name}`;
    } else {
      throw new HttpException(
        'No existe producto con el ID especificado, no es posible cargar la imagen',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}