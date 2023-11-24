/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParseData);
    const resultObject = result.toObject();
    // eslint-disable-next-line no-unused-vars
    const { orders, _id, ...responseWithoutOrders } = resultObject;

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: responseWithoutOrders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Validation Error',
      error: err,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch users!',
      error: err,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User data fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch user data',
      error: err,
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const { userId } = req.params;
    const result = await UserServices.updateSingleUserInDB(userId, updateData);
    res.status(200).json({
      success: true,
      message: 'Users updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update user!',
      error: err,
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Users deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to delete user!',
      error: err,
    });
  }
};
const addNewProductInOrder = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const { userId } = req.params;
    const result = await UserServices.addNewProductInOrderInDB(
      userId,
      newProduct,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to create order!',
      error: err,
    });
  }
};
const getAllOrdersForSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrdersForSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch order!',
      error: err,
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to calculate total price!',
      error: err,
    });
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewProductInOrder,
  getAllOrdersForSingleUser,
  getTotalPrice,
};
