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
    .setTitle('Microservice APIs')
    .setDescription('The API description for the gRPC microservice')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('swagger', httpApp, document);
  await httpApp.listen(2001);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Set desired logging levels
  });
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
  await app.listen(3001);
}
bootstrap();
