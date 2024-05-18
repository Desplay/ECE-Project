import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JWTModule } from 'src/common/jwt/jwt.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [forwardRef(() => UserModule), JWTModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
