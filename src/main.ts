import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const option = new DocumentBuilder()
    .setTitle('Divar Api Specification')
    .setVersion('1.0.0')
    .setDescription('get your desire Ads from Divar')
    .build();
  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}

bootstrap().then();
