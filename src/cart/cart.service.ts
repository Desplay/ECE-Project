import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartEntity } from 'src/common/datatype/entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<CartEntity>,
  ) {}

  async addProductToCart(
    userId: string,
    productid: string,
  ): Promise<void> {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      const newCart = new this.cartModel({
        userId: userId,
        products: [
          {
            productId: productid,
            quantity: 1,
          },
        ],
      });
      await newCart.save();
    } else {
      this.updateCart(userId, productid);
    }
  }

  async getCart(userId: string): Promise<CartEntity> {
    return await this.cartModel.findOne({ userId });
  }

  async updateCart(userId: string, productId: string): Promise<boolean> {
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

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    const cart = await this.cartModel.findOne({ userId });
    const productFound = cart.products.find(
      (product) => product.productId.toString() == productId,
    );
    if (!productFound) {
      return false;
    }
    cart.products.splice(
      cart.products.findIndex(
        (product) => product.productId.toString() == productId,
      ),
      1,
    );
    const status = await this.cartModel.findOneAndUpdate(
      { userId },
      { products: cart.products },
    );
    return status ? true : false;
  }
}
