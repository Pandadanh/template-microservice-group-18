import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import { AppModule } from './app.module';
import * as iceboom from 'iceboom';


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

  await httpApp.listen(2000);

}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupSwagger();
  // try {
  //   const { data: swaggerDocument } = await axios.get('http://localhost:3000/swagger');
  //   app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  //   console.log('Swagger UI available at http://localhost:3000/swagger');
  // } catch (error) {
  //   console.error('Failed to fetch Swagger JSON:', error);
  // }

  await app.listen(3000);
}
bootstrap();
