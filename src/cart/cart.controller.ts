import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartResponse } from 'src/common/datatype/dto/cart.dto';

@ApiTags('cart')
@Controller('cart')
@UseInterceptors(FileInterceptor('no-file'))
export class CartController {
  @Get('get:id')
  @ApiResponse({
    status: 200,
    description: 'Return cart',
  })
  @ApiResponse({
    status: 403,
    description: 'Cart not found',
  })
  async getCart(@Param('id') id: string): Promise<CartResponse> {
    console.log(id);
    return;
  }
}
