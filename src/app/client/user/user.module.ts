import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { join } from 'path';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({


  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../../../protos/users.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],


  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
