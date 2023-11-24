import { TOrder, TUser } from './user.interface';
import { User } from './user.model';
// service to create user in DB
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};
// service to get all users from DB
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};
// service to get single user from DB
const getSingleUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.findOne({ userId }).select({
    password: 0,
    orders: 0,
    _id: 0,
  });
  return result;
};
// service to update single user in DB
const updateSingleUserInDB = async (userId: string, updateData: TUser) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  ).select({
    password: 0,
    _id: 0,
    orders: 0,
  });
  return result;
};
// service to delete single user from DB
const deleteSingleUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};
// service to create a new product in order in DB
const addNewProductInOrderInDB = async (userId: string, newProduct: TOrder) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.updateOne(
    { userId },
    { $addToSet: { orders: newProduct } },
  );
  return result;
};
// service to get all orders for a single user from DB
const getAllOrdersForSingleUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 });
  return result;
};
// service to calculate total price for orders for a user in DB
const getTotalPriceFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const user = await User.findOne({ userId });
  const totalPrice = user?.orders
    ?.reduce(
      (accumulator, order) => accumulator + order.quantity * order.price,
      0,
    )
    .toFixed(2);
  return Number(totalPrice);
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
  deleteSingleUserFromDB,
  addNewProductInOrderInDB,
  getAllOrdersForSingleUserFromDB,
  getTotalPriceFromDB,
};
