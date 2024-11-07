import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtGuard } from './config/guard';
import { BlogModule } from './app/blog/blog.module';
import { UserModule } from './app/client/user/user.module';
import { JwtStrategy } from './config/strategy';

@Module({
  imports: [
    PrismaModule,
    BlogModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtGuard,
    // },

  ],
})
export class AppModule { }
