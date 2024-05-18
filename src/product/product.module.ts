import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/common/datatype/entity/product.entity';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JWTModule } from 'src/common/jwt/jwt.module';
import { UserModule } from 'src/user/user.module';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JWTModule,
    CloudinaryModule,
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
