import { Injectable, PipeTransform } from '@nestjs/common';
import { ProductInCartDTO } from 'src/common/datatype/dto/cart.dto';
import { ReceiptDTO } from 'src/common/datatype/dto/receipt.dto';
import { ReceiptEntity } from 'src/common/datatype/entity/receipt.entity';

@Injectable()
export class ReceiptEntityToDTO implements PipeTransform {
  transform({
    receiptValue,
    productsValue,
  }: {
    receiptValue: ReceiptEntity;
    productsValue: ProductInCartDTO[];
  }): ReceiptDTO {
    return {
      id: receiptValue._id.toString(),
      userId: receiptValue.userId.toString(),
      createdAt: receiptValue.createdAt,
      isPaid: receiptValue.isPaid,
      billingInfo: receiptValue.billingInfo,
      products: productsValue,
    };
  }
}
