import { Document, model, Schema } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  slot?: number;
  description: string;
  imageUri?: string[];
}

export interface ProductEntity extends Product, Document {}

export const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  slot: { type: Number, required: false, default: 0 },
  description: { type: String, required: true },
  imageUri: { type: [String], require: false, default: null },
});

export const ProductModel = model<Product>('Product', ProductSchema);
