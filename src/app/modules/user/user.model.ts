import { Document, Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TOrder,
  TUser,
  TUsername,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
// creating user schema
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
  isActive: {
    type: Boolean,
    required: [true, 'Active status is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies field is required'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
});
// static method to check is user exists or not
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};
// middleware to bcrypt password field
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
// middleware to hide password field
userSchema.post('save', function (doc, next) {
  doc.password = undefined as unknown as string;
  next();
});
// middleware to find deleted users
userSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find({ isActive: { $eq: true } });
  next();
});
// creating User Model

export const User = model<TUser, UserModel>('User', userSchema);
