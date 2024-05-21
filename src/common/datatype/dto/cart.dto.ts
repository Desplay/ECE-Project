import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';

export class CartResponse {
  @ApiProperty()
  products: ProductDTO[];
}
