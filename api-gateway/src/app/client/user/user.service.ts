import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthDtoResponse } from 'src/app/reponse';
import { AuthRequest } from 'src/app/request';

@Injectable()
export class UserService implements OnModuleInit {
  private usersService;

  constructor(@Inject('USERS_SERVICE') private client: ClientGrpc) { }

  // Khởi tạo gRPC service khi module được load
  onModuleInit() {
    this.usersService = this.client.getService('UserService');
  }

  async getUserById(id: string): Promise<AuthDtoResponse> {
    try {
      console.log('Fetching user with ID:', id);
      return await this.usersService.GetUserById({ id }).toPromise();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllUsers(): Promise<AuthDtoResponse[]> {
    try {
      return await this.usersService.GetAllUsers({}).toPromise();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(data: AuthRequest): Promise<AuthDtoResponse> {
    try {
      return await this.usersService.CreateUser(data).toPromise();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException('User creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(data: AuthDtoResponse): Promise<AuthDtoResponse> {
    try {
      return await this.usersService.UpdateUser(data).toPromise();
    } catch (error) {
      console.error('Error updating user:', error);
      throw new HttpException('User update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}