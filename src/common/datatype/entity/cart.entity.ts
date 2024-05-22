import { model, Schema, Document } from 'mongoose';

export interface Cart extends Document {
  userId: { type: Schema.Types.ObjectId; ref: 'User' } | string;
  isPurchased: boolean;
  products: [
    {
      productId: { type: Schema.Types.ObjectId; ref: 'Product' } | string;
      quantity: number;
    },
  ];
}

export interface CartEntity extends Cart, Document {}

export const CartSchema = new Schema<Cart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isPurchased: { type: Boolean, default: false },
  products: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

export const CartModel = model<Cart>('Cart', CartSchema);
