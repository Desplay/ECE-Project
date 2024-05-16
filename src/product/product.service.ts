import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductDTO,
  ProductInput,
} from 'src/common/datatype/dto/product.dto';
import { ProductEntity } from 'src/common/datatype/entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductEntity>,
  ) {}

  async createProduct(
    productInput: ProductInput,
    images?: Array<Express.Multer.File>,
  ): Promise<ProductEntity> {
    const createdProduct = new this.productModel(productInput);
    return await createdProduct.save();
  }
}
