import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { ReceiptInput } from 'src/common/datatype/dto/receipt.dto';
import {
  Receipt,
  ReceiptEntity,
} from 'src/common/datatype/entity/receipt.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectModel('Receipt')
    private readonly receiptModel: Model<ReceiptEntity>,
    private readonly cartService: CartService,
  ) {}

  async createReceipt(
    userId: string,
    receiptInput: ReceiptInput,
  ): Promise<boolean> {
    const getCart = (await this.cartService.getCart(userId, 'NONE'))[0];
    if (!getCart || getCart.status !== 'NONE') {
      return false;
    }
    const cartId = getCart._id;
    const newReceipt = new this.receiptModel({
      userId,
      billingInfo: receiptInput,
      cartId,
    });
    const status = await this.cartService.changeStatusById(
      cartId,
      'PENDING',
    );
    return (await newReceipt.save()) && status ? true : false;
  }

  async getAllReceipts(): Promise<Receipt[]> {
    return await this.receiptModel.find();
  }

  async getReceipts(userId: string): Promise<Receipt[]> {
    return await this.receiptModel.find({ userId });
  }

  async getReceiptById(receiptId: string): Promise<Receipt> {
    return await this.receiptModel.findById(receiptId);
  }

  async payReceipt(receiptId: string): Promise<boolean> {
    const receipt = await this.receiptModel.findById(receiptId);
    if (!receipt || receipt.isPaid) {
      return false;
    }
    receipt.isPaid = true;
    const getCart = await this.cartService.getCart(
      receipt.userId.toString(),
      'PENDING',
    );
    console.log(getCart);
    const cartId = getCart[0].id;
    const status = await this.cartService.changeStatusById(
      cartId,
      'SUCCESS',
    );
    return (await receipt.save()) && status ? true : false;
  }
}
