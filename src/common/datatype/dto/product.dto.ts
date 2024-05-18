import { ApiProperty } from '@nestjs/swagger';
import { Survey } from './user.dto';

export class ProductDTO {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'string', isArray: true })
  imageUrl?: string[];

  @ApiProperty({ type: 'number' })
  slot: number;

  @ApiProperty({ type: 'number' })
  rating: number;

  @ApiProperty({ type: 'string' })
  description: string;

  @ApiProperty({ type: Survey })
  productType: {
    category: string;
    color: string;
    size: string;
    model: string;
  };
}

export class ProductResponse {
  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty({ type: ProductDTO })
  products: ProductDTO;
}

export class ProductInput {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  price: number;

  @ApiProperty({ required: true })
  slot?: number;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ type: 'file', isArray: true })
  image?: Express.Multer.File[];

  @ApiProperty({ required: true })
  category: string;

  @ApiProperty({ required: true })
  color: string;

  @ApiProperty({ required: true })
  size: string;

  @ApiProperty({ required: true })
  model: string;
}

export class UpdateProductInput extends ProductInput {
  @ApiProperty({ required: true })
  productId: string;
}
