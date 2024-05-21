import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommonModule,
    UserModule,
    ProductModule,
    CartModule,
    ReceiptModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
