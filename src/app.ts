import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', UserRoutes);
const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Node Express server',
  });
};
app.get('/', getAController);

export default app;
