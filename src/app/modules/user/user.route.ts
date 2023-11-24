import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();
// route to create a user
router.post('/', UserControllers.createUser);
// route to get all users from DB
router.get('/', UserControllers.getAllUsers);
// route to get single user
router.get('/:userId', UserControllers.getSingleUser);
// route to update single user
router.put('/:userId', UserControllers.updateSingleUser);
// route to delete single user
router.delete('/:userId', UserControllers.deleteSingleUser);
// route to add a new product in order
router.put('/:userId/orders', UserControllers.addNewProductInOrder);
// route to get all orders for a single user
router.get('/:userId/orders', UserControllers.getAllOrdersForSingleUser);
// route to get total price for a single user order
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;
