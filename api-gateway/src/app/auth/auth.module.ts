import { User } from './../../../../users/node_modules/.prisma/client/index.d';
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "src/config/strategy";
import { ConvertToJwt } from "src/config/jwt";
import { UserModule } from '../client/user/user.module';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from '../client/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({

    imports: [ConfigModule, JwtModule.register({}), UserModule, PrismaModule],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
        ConvertToJwt,
        UserService,
        PrismaService
    ]
})
export class AuthModule { }