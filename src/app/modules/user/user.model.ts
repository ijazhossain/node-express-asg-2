import { Schema, model } from 'mongoose';
import { TAddress, TOrder, TUser, TUsername } from './user.interface';

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
  },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});
const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: [true, 'Street is required'] },
  price: { type: Number, required: [true, 'Street is required'] },
  quantity: { type: Number, required: [true, 'Street is required'] },
});
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: userNameSchema,
    required: [true, 'Full name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String] },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [orderSchema],
  },
});
export const User = model<TUser>('User', userSchema);
