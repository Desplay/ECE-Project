import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommonModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
