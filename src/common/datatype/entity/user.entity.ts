import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
  usertype: string;
  username: string;
  email: string;
  password: string;
  survey: {
    model: string[];
    size: string[];
    color: string[];
    category: string[];
  };
}

export interface UserEntity extends User, Document {}

export const UserSchema = new Schema<User>({
  usertype: { type: String, required: false, default: 'USER' },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  survey: {
    model: { type: [String], required: false, default: '' },
    size: { type: [String], required: false, default: '' },
    color: { type: [String], required: false, default: '' },
    category: { type: [String], required: false, default: '' },
  },
});

export const UserModel = model<User>('User', UserSchema);
