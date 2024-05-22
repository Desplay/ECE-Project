import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/auth.guard';
import { CartResponse } from 'src/common/datatype/dto/cart.dto';
import { CartService } from './cart.service';
import { JWTService } from 'src/common/jwt/jwt.service';
import { ProductService } from 'src/product/product.service';
import { MessageResponse } from 'src/common/datatype/dto/response.dto';
import { ProductEntityToDTO } from 'src/product/product.pipe';

@ApiTags('cart')
@Controller('cart')
@UseInterceptors(FileInterceptor('no-file'))
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly jwtService: JWTService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(UserGuard)
  @Get('get')
  @ApiResponse({
    status: 200,
    description: 'Return cart',
  })
  @ApiResponse({
    status: 403,
    description: 'Cart not found',
  })
  async getCart(@Headers() header: any): Promise<CartResponse> {
    const userid = (await this.jwtService.getPayloadFromHeader(header))
      .userid;
    const cart = await this.cartService.getCart(userid);
    if (!cart) {
      throw new ForbiddenException('Cart not found');
    }
    const productsInCart = [];
    for await (const product of cart.products) {
      const productReturn = new ProductEntityToDTO().transform(
        await this.productService.findProductById(
          product.productId.toString(),
        ),
      );
      delete productReturn.productType;
      delete productReturn.slot;
      delete productReturn.rating;
      delete productReturn.description;
      productsInCart.push({
        ...productReturn,
        quantity: product.quantity,
      });
    }
    return {
      isPurchased: cart.isPurchased,
      productsInCart,
    };
  }

  @UseGuards(UserGuard)
  @Post('add')
  @ApiResponse({
    status: 200,
    description: 'Product added to cart',
  })
  @ApiResponse({
    status: 403,
    description: 'Product not found',
  })
  async addProductToCart(
    @Headers() header: any,
    @Body() input: any,
  ): Promise<MessageResponse> {
    const userid = (await this.jwtService.getPayloadFromHeader(header))
      .userid;
    const productid = input.productid;
    const product = await this.productService.findProductById(productid);
    if (!product) {
      throw new ForbiddenException('Product not found');
    }
    await this.cartService.addProductToCart(userid, productid);
    return {
      message: 'Product added to cart',
    };
  }

  @UseGuards(UserGuard)
  @Delete('remove')
  @ApiResponse({
    status: 200,
    description: 'Product removed from cart',
  })
  @ApiResponse({
    status: 403,
    description: 'Product not found',
  })
  async removeProductFromCart(
    @Headers() header: any,
    @Body() input: any,
  ): Promise<MessageResponse> {
    const userid = (await this.jwtService.getPayloadFromHeader(header))
      .userid;
    const productid = input.productid;
    const product = await this.productService.findProductById(productid);
    if (!product) {
      throw new ForbiddenException('Product not found');
    }
    await this.cartService.removeProductFromCart(userid, productid);
    return {
      message: 'Product removed from cart',
    };
  }
}
