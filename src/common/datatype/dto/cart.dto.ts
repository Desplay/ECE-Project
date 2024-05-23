import { ApiProperty } from '@nestjs/swagger';

export class ProductInCartDTO {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  imageUrl: string[];
  @ApiProperty()
  quantity: number;
}
export class CartResponse {
  @ApiProperty()
  status: 'NONE' | 'PENDING' | 'SUCCESS';
  @ApiProperty()
  productsInCart: ProductInCartDTO[];
}
