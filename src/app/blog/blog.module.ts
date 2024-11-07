import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { UserService } from '../client/user/user.service';
import { UserModule } from '../client/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule { }
