import { Injectable, PipeTransform } from '@nestjs/common';
import { ProductDTO } from 'src/common/datatype/dto/product.dto';
import { ProductEntity } from 'src/common/datatype/entity/product.entity';

@Injectable()
export class ProductEntityToDTO implements PipeTransform {
  transform(value: ProductEntity): ProductDTO {
    return {
      id: value._id,
      name: value.name,
      slot: value.slot,
      rating: value.rating,
      description: value.description,
      price: value.price,
      imageUrl: value.imageUrl,
      productType: value.productType,
    };
  }
}
