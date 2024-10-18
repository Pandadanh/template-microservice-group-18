import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    //'postgresql://postgres:12345678@localhost:5432/MicroserviceStudy?schema=public'
                    url: configService.get('DATABASE_URL'),
                },
            },
        });
        // console.log(`configService.get('DATABASE_URL')` + JSON.stringify(configService.get('DATABASE_URL')));
    }

}