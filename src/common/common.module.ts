import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { JWTModule } from './jwt/jwt.module';

@Module({
  imports: [DatabaseModule, JWTModule],
})
export class CommonModule {}
