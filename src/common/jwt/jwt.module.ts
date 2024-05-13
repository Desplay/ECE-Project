import { Module } from '@nestjs/common';
import { JwtModule as JWT } from '@nestjs/jwt';
import { JWTService } from './jwt.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    JWT.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
