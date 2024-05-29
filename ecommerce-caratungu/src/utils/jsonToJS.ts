import * as fs from 'fs';
import * as path from 'path';

// esta función convierte un archivo ubicado en la ruta src/db, dentro de la carpeta raiz del proyecto
export const JsonToJS = (fileName: string) => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'dB', fileName);
  const rawData = fs.readFileSync(filePath);
  const fileJS = JSON.parse(rawData.toString());

  return fileJS;
};
