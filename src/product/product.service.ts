import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { ProductInput } from 'src/common/datatype/dto/product.dto';
import {
  Product,
  ProductEntity,
} from 'src/common/datatype/entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createProduct(
    productInput: ProductInput,
    userId: string,
    images?: Array<Express.Multer.File>,
  ): Promise<Product> {
    const newProduct = {
      name: productInput.name,
      price: productInput.price,
      slot: productInput.slot,
      rating: 0,
      description: productInput.description,
      imageUrl: [],
      productType: {
        category: productInput.category,
        color: productInput.color,
        size: productInput.size,
        model: productInput.model,
      },
    };
    const createdProduct = new this.productModel(newProduct);
    createdProduct.userId = userId;
    if (images) {
      let index = 0;
      for await (const image of images) {
        const url = await this.cloudinaryService.uploadFile(
          image,
          createdProduct._id,
          index,
        );
        index++;
        createdProduct.imageUrl.push(url.url);
      }
    }
    return await createdProduct.save();
  }

  async findAllProduct(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async updateProductById(
    productId: string,
    userId: string,
    productInput: ProductInput,
    images?: Array<Express.Multer.File>,
  ): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      return undefined;
    }
    const imageUrl = [];
    if (images) {
      if (product.imageUrl) {
        for await (const image of product.imageUrl) {
          const response =
            await this.cloudinaryService.removeFileFromUrl(image);
          if (!response || response.result === 'not found') {
            return undefined;
          }
        }
      }
      let index = 0;
      for await (const image of images) {
        const url = await this.cloudinaryService.uploadFile(
          image,
          product._id,
          index,
        );
        if (!url) {
          return undefined;
        }
        index++;
        imageUrl.push(url.url);
      }
    }
    return await this.productModel.findByIdAndUpdate(
      productId,
      {
        ...productInput,
        productType: {
          category: productInput.category
            ? productInput.category
            : product.productType.category,
          color: productInput.color
            ? productInput.color
            : product.productType.color,
          size: productInput.size
            ? productInput.size
            : product.productType.size,
          model: productInput.model
            ? productInput.model
            : product.productType.model,
        },
        userId: userId,
        imageUrl: imageUrl,
      },
      {
        new: true,
      },
    );
  }

  async deleteProduct(productId: string): Promise<Product> {
    const productFound = await this.productModel.findById(productId);
    if (!productFound) {
      return undefined;
    }
    if (productFound.imageUrl) {
      for await (const image of productFound.imageUrl) {
        const response =
          await this.cloudinaryService.removeFileFromUrl(image);
        if (!response || response.result === 'not found') {
          return undefined;
        }
      }
    }
    return await this.productModel.findByIdAndDelete(productId);
  }
}
