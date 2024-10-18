import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { join } from 'path';
import { UserModule } from './app/client/user/user.module';
import { SwaggerAggregatorController } from './config/swagger/swagger-aggregator.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtGuard } from './config/guard';

@Module({
  imports: [
    UserModule, PrismaModule, AuthModule
  ],
  controllers: [SwaggerAggregatorController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },

  ],
})
export class AppModule { }
