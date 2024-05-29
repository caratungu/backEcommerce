import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}

  saveFile(id: string, image: Express.Multer.File) {
    return this.filesRepository.saveFile(id, image);
  }
}
