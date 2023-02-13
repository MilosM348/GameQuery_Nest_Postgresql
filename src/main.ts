import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerDocumentOptions, SwaggerCustomOptions } from './services/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Game query')
    .setDescription('Game Query API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Game API Docs',
  }
  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(3000);
}
bootstrap();
