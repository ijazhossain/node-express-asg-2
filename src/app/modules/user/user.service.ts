import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.findOne({ userId }).select({
    password: 0,
  });
  return result;
};
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
  });
  return result;
};
const deleteSingleUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
  deleteSingleUserFromDB,
};
