import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthRequest } from 'src/app/request';
import { AuthDtoResponse } from 'src/app/reponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-test')
@Controller('user-test')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post()
  async createUser(@Body() data: AuthRequest): Promise<AuthDtoResponse> {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUserByIdHttp(@Param('id') id: string): Promise<AuthDtoResponse> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getAllUsers(): Promise<AuthDtoResponse[]> {
    return this.userService.getAllUsers();
  }

  @Put()
  async updateUser(@Body() data: AuthDtoResponse): Promise<AuthDtoResponse> {
    return this.userService.updateUser(data);
  }


}
