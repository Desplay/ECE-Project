import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { UserGuard } from 'src/auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTService } from 'src/common/jwt/jwt.service';
import { MessageResponse } from 'src/common/datatype/dto/response.dto';
import {
  ReceiptDTO,
  ReceiptInput,
} from 'src/common/datatype/dto/receipt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { ProductEntityToDTO } from 'src/product/product.pipe';
import { ReceiptEntityToDTO } from './receipt.pipe';

@ApiTags('receipt')
@Controller('receipt')
@UseInterceptors(FileInterceptor('no-file'))
export class ReceiptController {
  constructor(
    private readonly receiptService: ReceiptService,
    private readonly jwtService: JWTService,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(UserGuard)
  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'Return receipt created',
  })
  @ApiResponse({
    status: 403,
    description: 'Receipt already exists',
  })
  @ApiResponse({
    status: 403,
    description: 'Receipt created failed',
  })
  async createReceipt(
    @Headers() headers: any,
    @Body() receiptInput: ReceiptInput,
  ): Promise<MessageResponse> {
    const userid = (await this.jwtService.getPayloadFromHeader(headers))
      .userid;
    const receiptsFound = await this.receiptService.getReceipts(userid);
    for (const receiptFound of receiptsFound) {
      if (receiptFound.isPaid == false) {
        throw new ForbiddenException('Receipt already exists');
      }
    }
    const status = await this.receiptService.createReceipt(
      userid,
      receiptInput,
    );
    if (!status) {
      throw new ForbiddenException('Receipt created failed');
    }
    return { message: 'Receipt created' };
  }

  @UseGuards(UserGuard)
  @Get('get')
  @ApiResponse({
    status: 200,
    description: 'Return receipts',
  })
  @ApiResponse({
    status: 403,
    description: 'Receipt not found',
  })
  async getReceipts(@Headers() headers: any): Promise<ReceiptDTO[]> {
    const userid = (await this.jwtService.getPayloadFromHeader(headers))
      .userid;
    const receipts = await this.receiptService.getReceipts(userid);
    if (!receipts) {
      throw new ForbiddenException('Receipt not found');
    }
    const receiptsReturn = [];
    for await (const receipt of receipts) {
      const cartFound = await this.cartService.getCartById(
        receipt.cartId.toString(),
      );
      const productsInCart = [];
      for await (const product of cartFound.products) {
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
      receiptsReturn.push(
        new ReceiptEntityToDTO().transform({
          receiptValue: receipt,
          productsValue: productsInCart,
        }),
      );
    }
    return receiptsReturn;
  }

  @UseGuards(UserGuard)
  @Post('pay')
  @ApiResponse({
    status: 200,
    description: 'Return receipt paid',
  })
  @ApiResponse({
    status: 403,
    description: 'Receipt not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Receipt paid failed',
  })
  async payReceipt(
    @Headers() headers: any,
    @Body() input: any,
  ): Promise<MessageResponse> {
    const receiptsFound = await this.receiptService.getReceiptById(
      input.receiptid,
    );
    if (!receiptsFound) {
      throw new ForbiddenException('Receipt not found');
    }
    const status = await this.receiptService.payReceipt(input.receiptid);
    if (!status) {
      throw new ForbiddenException('Receipt paid failed');
    }
    return { message: 'Receipt paid' };
  }
}
