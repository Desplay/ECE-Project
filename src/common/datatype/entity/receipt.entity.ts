import { Document, Schema } from 'mongoose';

export interface Receipt extends Document {
  createdAt: Date;
  isPaid: boolean;
  userId: { type: Schema.Types.ObjectId; ref: 'User' } | string;
  billingInfo: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  cartId: { type: Schema.Types.ObjectId; ref: 'Cart' } | string;
}

export interface ReceiptEntity extends Receipt, Document {}

export const ReceiptSchema = new Schema<Receipt>({
  createdAt: { type: Date, default: Date.now },
  isPaid: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  billingInfo: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  },
  cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
});
