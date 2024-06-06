import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PORT } from './config/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const version = require('../package.json').version

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(LoggerMiddleware);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce - Caratungu')
    .setDescription('Esta es la documentación correspondiente a la API para un eccomerce, implementada como proyecto individual del módulo 4, de la especialidad Backen en la carrera Fullstack Developer en Henry. \nAl iniciar la app se realiza una validación respecto a si existe o no información en la base de datos de Categorías, Productos y Usuarios, en caso de estar vacía, se hará una precarga para poder hacer pruebas. Si ya hay información no se realizará la precarga.')
    .setVersion(version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
