import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartEntity } from 'src/common/datatype/entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<CartEntity>,
  ) {}

  async addProductToCart(
    userId: string,
    productid: string,
  ): Promise<boolean> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart || cart.status == 'SUCCESS') {
      const newCart = new this.cartModel({
        userId: userId,
        products: [
          {
            productId: productid,
            quantity: 1,
          },
        ],
      });
      return (await newCart.save()) ? true : false;
    } else if (cart.status == 'PENDING') {
      return false;
    } else {
      return this.updateCart(userId, productid) ? true : false;
    }
  }

  async getCart(userId: string, status): Promise<Cart[]> {
    return await this.cartModel.find({ userId, status });
  }

  async getCartById(cartId: string): Promise<Cart> {
    return await this.cartModel.findById(cartId);
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart || cart.status != 'NONE') {
      return false;
    }
    const productFound = cart.products.find(
      (product) => product.productId.toString() == productId,
    );
    if (!productFound) {
      return false;
    }
    if (productFound.quantity == 1) {
      cart.products.splice(
        cart.products.findIndex(
          (product) => product.productId.toString() == productId,
        ),
        1,
      );
    } else {
      cart.products.find(
        (product) => product.productId.toString() == productId,
      ).quantity -= 1;
    }
    const status = await this.cartModel.findOneAndUpdate(
      { userId },
      { products: cart.products },
    );
    return status ? true : false;
  }

  async changeStatusById(
    cartId: string,
    status: 'NONE' | 'PENDING' | 'SUCCESS',
  ): Promise<boolean> {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) {
      return false;
    }
    cart.status = status;
    const statusUpdate = await cart.save();
    return statusUpdate ? true : false;
  }

  private async updateCart(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    const cart = await this.cartModel.findOne({ userId });
    const productFound = cart.products.find(
      (product) => product.productId.toString() == productId,
    );
    if (productFound) {
      productFound.quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    const status = await this.cartModel.findOneAndUpdate(
      { userId },
      { products: cart.products },
    );
    return status ? true : false;
  }
}
