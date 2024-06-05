import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class FilesRepository {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
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
