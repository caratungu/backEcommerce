import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  async saveFile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: "El archivo debe ser menor a 200kb"
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp|gif|svg)/
        })
      ]
    })) image: Express.Multer.File,
  ) {
    return await this.filesService.saveFile(id, image);
  }
}
