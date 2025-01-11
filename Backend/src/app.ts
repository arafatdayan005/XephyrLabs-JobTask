import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/errors/globalErrorHandler';
import { UserRoutes } from './app/modules/User/user.route';
import { AuthRoutes } from './app/modules/Auth/auth.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
});
app.use(globalErrorHandler);

export default app;
