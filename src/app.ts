import express from 'express';
import { authRouter } from './controllers/authController';
import { emailRouter } from './controllers/emailController';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/email', emailRouter);

export { app };
