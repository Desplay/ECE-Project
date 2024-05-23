import { ApiProperty } from '@nestjs/swagger';
import { ProductInCartDTO } from './cart.dto';

export class ReceiptInput {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  phoneNumber: string;

  @ApiProperty({ required: true })
  address: string;
}

export class ReceiptDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  billingInfo: {
    name: string;
    phoneNumber: string;
    address: string;
  };

  @ApiProperty()
  products: ProductInCartDTO[];
}
