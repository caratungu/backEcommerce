import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // dropSchema: true,
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], //'dist/**/*.entity{.ts,.js}'
  migrations: ['dist/migrations/*{.ts,.js}']
};

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)

export const PORT = process.env.PORT || 3000;
