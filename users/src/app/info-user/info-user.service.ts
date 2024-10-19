import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from '../dto';
import { AuthDtoResponse } from '../reponse';
import * as argon from "argon2";
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class InfoUserService {
    constructor(
        private prismaService: PrismaService,
    ) {

    }

    getHello(): string {
        return 'Hello World!';
    }

    async createUser(authDto: AuthDto): Promise<AuthDtoResponse> {

        const existingUser = await this.prismaService.user.findUnique({
            where: { email: authDto.email },
        });

        if (existingUser) {
            throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
        }

        const user = await this.prismaService.user.create({
            data: {
                id: randomUUID(),
                name: authDto.name,
                email: authDto.email,
                phoneNumber: authDto.phoneNumber,
                address: authDto.address,
            },
            select: { id: true, email: true, name: true, phoneNumber: true, address: true },
        });

        return user;
    }

    async getUserById(id: string): Promise<AuthDtoResponse> {
        const user = await this.prismaService.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };
    }

    async getAllUsers(): Promise<AuthDtoResponse[]> {
        const users = await this.prismaService.user.findMany();

        return users.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        }));
    }

    async updateUser(authDto: AuthDto): Promise<AuthDtoResponse> {
        const user = await this.prismaService.user.findUnique({ where: { id: authDto.id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${authDto.id} not found`);
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id: authDto.id },
            data: {
                email: authDto.email,
                name: authDto.name,
                phoneNumber: authDto.phoneNumber,
                address: authDto.address,
            },
        });

        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            phoneNumber: updatedUser.phoneNumber,
            address: updatedUser.address,
        };
    }
}