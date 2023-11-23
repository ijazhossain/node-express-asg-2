import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.put('/:userId/orders', UserControllers.addNewProductInOrder);
router.get('/:userId/orders', UserControllers.getAllOrdersForSingleUser);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);
export const UserRoutes = router;
