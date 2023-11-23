import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw Error('User do not exists!');
  }
  const result = await User.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const result = await User.findOne({ userId });
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
  );
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
};
