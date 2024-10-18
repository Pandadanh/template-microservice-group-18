import { HttpException, HttpStatus, Injectable, NotFoundException, Req } from "@nestjs/common";
import * as argon from "argon2";
import { randomUUID } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConvertToJwt } from "src/config/jwt";
import { AuthRequest } from "../request";
import { AuthDtoResponse } from "../reponse";
import { UserService } from '../client/user/user.service';
import { retry } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { from } from "rxjs";
@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private convertToJwt: ConvertToJwt,
        private userService: UserService
    ) {

    }
    /* async register(authDto: UserInfoDto) {
        const hashedPassword = await argon.hash(authDto.password);

        try {
            const existingUser = await this.prismaService.user.findUnique({
                where: {
                    email: authDto.email,
                },
            });

            console.log('existingUser', existingUser);
            if (existingUser) {
                throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
            }
            console.log('123', existingUser);

            const user = await this.prismaService.user.create({
                data: {
                    id: randomUUID(),
                    employeeId: randomUUID(),
                    email: authDto.email,
                    hashedpassword: hashedPassword,
                },
                select: {
                    id: true,
                    email: true,
                },
            });

            return await this.convertToJwt.convertToJwtString(user.id, user.email);
        } catch (error) {
            console.error('Error registering user');
            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } */
    async getTokenService() {
        try {
            return await this.convertToJwt.convertToJwtString('', null);
        } catch (error) {
            console.error('Error generating token:', error);
            throw new HttpException('Failed to generate token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(authDto: AuthRequest) {
        console.log('logins', authDto.username);

        const acc = await this.prismaService.acc.findUnique({
            where: { username: authDto.username },
        });

        if (!acc) {
            console.log('User or Password not found');
            throw new HttpException('User or Password not found', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await argon.verify(acc.hashedpassword, authDto.password);
        if (!isPasswordValid) {
            console.log('User or Password not found');
            throw new HttpException('User or Password not found', HttpStatus.UNAUTHORIZED);
        }

        delete acc.hashedpassword;
        try {
            const user = await firstValueFrom(from(this.userService.getUserById(acc.id)));

            if (!user) {
                console.error(`User with ID ${acc.id} not found.`);
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return await this.convertToJwt.convertToJwtString(acc.id, user);

        } catch (error) {
            console.error('Error generating JWT', error);
            throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }


}