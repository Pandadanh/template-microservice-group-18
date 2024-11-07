import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function setupSwagger() {
  const httpApp = await NestFactory.create(AppModule);

  httpApp.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Microservice API')
    .setDescription('The API description for the gRPC microservice')
    .setVersion('1.0')
    .addTag('user-test')
    .addTag('auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    ).build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('swagger', httpApp, document, {
    swaggerOptions: {
      tryItOutEnabled: true,
    },
  });
  await httpApp.listen(2003);

}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupSwagger();
  await app.listen(3003);
}
bootstrap();
