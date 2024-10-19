import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import axios from 'axios';

interface SwaggerDoc {
    paths?: Record<string, any>;
    components?: {
        schemas?: Record<string, any>;
    };
}

async function fetchSwaggerDocs(url: string): Promise<SwaggerDoc> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Swagger document from ${url}:`, error);
        return {}; // Return an empty object if the request fails
    }
}

export async function setupUserTestSwagger() {
    const httpApp = await NestFactory.create(AppModule);

    httpApp.useGlobalPipes(new ValidationPipe());

    const userTestSwaggerDoc = await fetchSwaggerDocs('http://localhost:2001/swagger-json');
    const usersSwaggerDoc = await fetchSwaggerDocs('http://localhost:2002/swagger-json');

    const combinedSwaggerDoc = {
        ...userTestSwaggerDoc,
        paths: {
            ...userTestSwaggerDoc.paths,
            ...usersSwaggerDoc.paths,
        },
        components: {
            ...userTestSwaggerDoc.components,
            ...usersSwaggerDoc.components,
        },
    };

    const config = new DocumentBuilder()
        .setTitle('Combined Microservice APIs')
        .setDescription('The API description for the combined gRPC microservices')
        .setVersion('1.0')
        .addTag('user-test')
        .addTag('info-user')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'access-token',
        ).build();

    const document = SwaggerModule.createDocument(httpApp, config, {
        extraModels: Object.values(combinedSwaggerDoc.components?.schemas || {}),
    });

    SwaggerModule.setup('swagger', httpApp, document, {
        swaggerOptions: {
            tryItOutEnabled: true,
        },
    });

    await httpApp.listen(3005); // Swagger will be available at http://localhost:3005/swagger
}