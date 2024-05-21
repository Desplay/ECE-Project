import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AdminGuard, AuthGuard } from 'src/auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductResponse,
  ProductDTO,
  ProductInput,
  UpdateProductInput,
} from 'src/common/datatype/dto/product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from 'src/common/datatype/entity/product.entity';
import { JWTService } from 'src/common/jwt/jwt.service';
import { ProductEntityToDTO } from './product.pipe';
import { MessageResponse } from 'src/common/datatype/dto/response.dto';

@ApiTags('product')
@UseGuards(AuthGuard)
@UseInterceptors(AnyFilesInterceptor())
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly jwtService: JWTService,
  ) {}

  @UseGuards(AdminGuard)
  @Post('add')
  @ApiResponse({
    status: 200,
    description: 'Return product added',
    type: ProductResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Product already exists or missing information',
  })
  async addProduct(
    @Headers() header: any,
    @Body() productInput: ProductInput,
    @UploadedFiles() images: any,
  ): Promise<ProductResponse> {
    const userId = (await this.jwtService.getPayloadFromHeader(header))
      .userid;
    let addedProduct: ProductEntity = null;
    if (images) {
      addedProduct = await this.productService.createProduct(
        productInput,
        userId,
        images,
      );
    } else if (!images && productInput) {
      addedProduct = await this.productService.createProduct(
        productInput,
        userId,
      );
    }
    if (!addedProduct)
      throw new ForbiddenException(
        'Product already exists or missing information',
      );
    return {
      message: 'Product added',
      products: new ProductEntityToDTO().transform(addedProduct),
    };
  }

  @Get('getAll')
  @ApiResponse({
    status: 200,
    description: 'Return product',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 403,
    description: 'Product not found',
  })
  async getProduct(): Promise<ProductDTO[]> {
    const products = await this.productService.findAllProduct();
    if (!products) throw new ForbiddenException('Product not found');
    return products.map((product) =>
      new ProductEntityToDTO().transform(product),
    );
  }

  @UseGuards(AdminGuard)
  @Patch('update')
  @ApiResponse({
    status: 200,
    description: 'Return product updated',
    type: ProductResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Product not found',
  })
  async updateProduct(
    @Headers() header: any,
    @Body() productInput: UpdateProductInput,
    @UploadedFiles() images: any,
  ): Promise<ProductResponse> {
    const userId = (await this.jwtService.getPayloadFromHeader(header))
      .userid;
    let updatedProduct: ProductEntity = null;
    if (images) {
      updatedProduct = await this.productService.updateProductById(
        productInput.productId,
        userId,
        productInput,
        images,
      );
    } else if (!images && productInput) {
      updatedProduct = await this.productService.updateProductById(
        productInput.productId,
        userId,
        productInput,
      );
    }
    if (!updatedProduct)
      throw new ForbiddenException(
        'Product not found or something went wrong',
      );
    return {
      message: 'Product updated',
      products: new ProductEntityToDTO().transform(updatedProduct),
    };
  }

  @UseGuards(AdminGuard)
  @Delete('delete')
  @ApiResponse({
    status: 200,
    description: 'Return product deleted',
    type: MessageResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Product not found',
  })
  async deleteProduct(@Body() input: any): Promise<MessageResponse> {
    const deletedProduct = await this.productService.deleteProduct(
      input.productId,
    );
    if (!deletedProduct) throw new ForbiddenException('Product not found');
    return {
      message: 'Product deleted',
    };
  }
}
