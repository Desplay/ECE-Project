import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { JWTModule } from './jwt/jwt.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, JWTModule, CloudinaryModule],
})
export class CommonModule {}
