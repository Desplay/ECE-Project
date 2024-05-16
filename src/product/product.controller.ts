import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductDTO,
  ProductInput,
} from 'src/common/datatype/dto/product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from 'src/common/datatype/entity/product.entity';

@ApiTags('product')
@UseGuards(AuthGuard)
@UseInterceptors(AnyFilesInterceptor())
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  @ApiResponse({
    status: 200,
    description: 'Return product added',
  })
  @ApiResponse({
    status: 403,
    description: 'Product already exists or missing information',
  })
  async addProduct(
    @Body() productInput: ProductInput,
    @UploadedFiles() images: any,
  ): Promise<string> {
    let addedProduct: ProductEntity = null;
    if (images) {
      addedProduct = await this.productService.createProduct(productInput);
    } else if (!images && productInput) {
      addedProduct = await this.productService.createProduct(productInput);
    }
    if (!addedProduct)
      throw new ForbiddenException(
        'Product already exists or missing information',
      );
    return 'Product added';
  }
}
