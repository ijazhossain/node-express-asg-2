import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

export const userValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
});
