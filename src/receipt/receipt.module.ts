import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { UserModule } from 'src/user/user.module';
import { JWTModule } from 'src/common/jwt/jwt.module';
import { ProductModule } from 'src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceiptSchema } from 'src/common/datatype/entity/receipt.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    UserModule,
    JWTModule,
    ProductModule,
    CartModule,
    MongooseModule.forFeature([
      { name: 'Receipt', schema: ReceiptSchema },
    ]),
  ],
  providers: [ReceiptService],
  controllers: [ReceiptController],
})
export class ReceiptModule {}
