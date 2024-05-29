import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { FilesRepository } from './files.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, CloudinaryConfig, CloudinaryService],
})
export class FilesModule {}
