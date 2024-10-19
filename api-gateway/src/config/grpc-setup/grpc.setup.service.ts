import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'src/app.module';

export async function GrpcSetupService() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const host = configService.get<string>('HOST_SERVICE', 'localhost');
    const port = configService.get<number>('PORT_SERVICE', 3005);
    const packages = configService.get<string>('NAME_SERVICE', 'microservice');
    const db = configService.get<string>('NAME_DATABASE', 'microserviceGateway');

    const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: packages,
            protoPath: join(__dirname, '../proto/auth.proto'),
            url: `localhost:50051`,
        },
    });
    grpcApp.useGlobalPipes(new ValidationPipe());
    await grpcApp.listen();
    console.log(`${packages} :/ ${host}:${port} AND db: ${db}`);

    return grpcApp;
}
