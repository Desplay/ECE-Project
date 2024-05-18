import { Document, model, Schema } from 'mongoose';

export interface Product extends Document {
  userId: { type: Schema.Types.ObjectId; ref: 'User' } | string;
  name: string;
  price: number;
  rating?: number;
  slot?: number;
  description: string;
  imageUrl?: string[];
  productType: {
    category: string;
    color: string;
    size: string;
    model: string;
  };
}

export interface ProductEntity extends Product, Document {}

export const ProductSchema = new Schema<Product>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  slot: { type: Number, required: false, default: 0 },
  rating: { type: Number, required: false, default: 0 },
  description: { type: String, required: true },
  imageUrl: { type: [String], require: false, default: null },
  productType: {
    category: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    model: { type: String, required: true },
  },
});

export const ProductModel = model<Product>('Product', ProductSchema);
