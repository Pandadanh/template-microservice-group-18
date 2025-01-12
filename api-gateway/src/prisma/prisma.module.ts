import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Global()
@Module({
  imports: [ConfigModule], // Đảm bảo import ConfigModule
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
