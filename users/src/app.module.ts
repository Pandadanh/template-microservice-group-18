import { Module } from '@nestjs/common';
import { InfoUserModule } from './app/info-user/info-user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SalaryModule } from './app/salary/salary.module';

@Module({
  imports: [InfoUserModule, PrismaModule, ConfigModule, SalaryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
