import { registerAs } from '@nestjs/config';

export default registerAs('root', () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    extra: {
      trustServerCertificate: true,
    },
    cli: {
      migrationsDir: 'src/migrations',
    },
    synchronize: true,
    autoLoadEntities: true,
    database: 'divar',
  },
}));
