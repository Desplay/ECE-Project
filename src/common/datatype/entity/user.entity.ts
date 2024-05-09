import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
}

export interface UserEntity extends User, Document {}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', UserSchema);
