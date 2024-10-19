import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function setupSwagger() {
  const httpApp = await NestFactory.create(AppModule);

  httpApp.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Microservice API')
    .setDescription('The API description for the gRPC microservice')
    .setVersion('1.0')
    .addTag('info-user')
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
  await httpApp.listen(2002);

}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupSwagger();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, 'protos/users.proto'),
      url: 'localhost:50051',
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
