import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { InfoUserService } from './info-user.service';
import { AuthDto } from '../dto';
import { AuthDtoResponse } from '../reponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('info-user')
@Controller('info-user')
export class InfoUserController {
    constructor(private infoUserService: InfoUserService) { }

    // @Get()
    getHello(): string {
        return this.infoUserService.getHello();
    }

    @GrpcMethod('UserService', 'GetUserTest')
    // @Get()
    findOne(data) {
        console.log(data);
        return data;
    }

    @Post('create')
    async createUser(@Body() data: AuthDto): Promise<AuthDtoResponse> {
        try {
            return await this.infoUserService.createUser(data);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new HttpException('User creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GrpcMethod('UserService', 'GetUserById')
    async getUserByIdGrpc(@Body() data: { id: string }): Promise<AuthDtoResponse> {
        console.log('select user id:', data.id);
        return await this.infoUserService.getUserById(data.id);
    }

    @Get(':id')
    async getUserByIdHttp(@Param('id') id: string): Promise<AuthDtoResponse> {
        console.log('select user id:', id);
        return await this.infoUserService.getUserById(id);
    }

    @GrpcMethod('UserService', 'GetAllUsers')
    @Get()
    async getAllUsers(): Promise<AuthDtoResponse[]> {
        return await this.infoUserService.getAllUsers();
    }

    @GrpcMethod('UserService', 'UpdateUser')
    @Put()
    async updateUser(@Body() data: AuthDto): Promise<AuthDtoResponse> {
        try {
            return await this.infoUserService.updateUser(data);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new HttpException('User update failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GrpcMethod('UserService', 'PrintHello')
    @Get('hello')
    async printHello(): Promise<string> {
        return 'Hello';
    }
}
