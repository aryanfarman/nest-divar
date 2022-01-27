module.exports = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'user10',
  password: '123',
  database: 'divar',
  synchronize: true,
  extra: {
    trustServerCertificate: true,
  },
  autoLoadEntities: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};
