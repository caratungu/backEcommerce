import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PORT } from './config/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const version = require('../package.json').version;

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
    .setDescription(
      '<p>Esta es la documentación correspondiente a la API para un eccomerce, implementada como proyecto individual del módulo 4, de la especialidad Backend en la carrera Fullstack Developer en Henry.</p><p>Se tiene implementada funcionalidad para:<ul><li>Registro y autenticación de usuarios.</li><li>CRUD de usuarios.</li><li>CRUD de productos.</li><li>Crear y consultar ordenes de compra.</li><li>Consultar detalles de ordenes de compra.</li><li>Cargar imágenes en repositorios en la nube para los productos.</li></ul></p><p><strong>Importante:</strong></p><ul><li>Al iniciar la app se realiza una validación respecto a si existe o no información en la base de datos de Categorías, Productos y Usuarios, en caso de estar vacía, se hará una precarga para poder hacer pruebas. Si ya hay información no se realizará la precarga.</li><li>Existen rutas protegidas y rutas libres. Para poder revisar las rutas protegidas es importante que: <ol><li>Haga registro de un usuario de pruba en auth/signup.</li><li>Posteriormente ingrese por auth/signin con las credenciales creadas.</li><li>Copie el token generado en la sección <strong>Authorize</strong>.</li></ol></li><li>Para acceder a una lista con todos los usuarios, además de acceder con las credenciales de un usuario existente, éste debe tener rol de administrador.</li></ul>',
    )
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
    }
  });

  await app.listen(PORT);
}
bootstrap();
