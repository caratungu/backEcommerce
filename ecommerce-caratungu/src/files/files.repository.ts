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

  async saveFile(image: Express.Multer.File) {
    try {
      const uploadedImage = await this.cloudinaryService.uploadImage(image);
      return uploadedImage;
    } catch (error) {
      throw new HttpException(
        'No se pudo almacenar la imagen',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
