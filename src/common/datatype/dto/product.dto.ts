import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl?: string[];

  @ApiProperty()
  slot: number;

  @ApiProperty()
  description: string;
}

export class ProductInput {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  slot?: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'file', isArray: true })
  image?: Express.Multer.File[];
}
