import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserModule } from 'src/user/user.module';
import { JWTModule } from 'src/common/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { CartSchema } from 'src/common/datatype/entity/cart.entity';
@Module({
  imports: [
    UserModule,
    JWTModule,
    ProductModule,
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
