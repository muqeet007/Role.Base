import express from 'express';
import {router as AuthRouter} from './routes/auth.route.js';
import errorHandler from './middlewares/globalerrorHandler.js';

const app = express();
app.use(express.json());

// app.use('/api/auth', AuthRouter);
// app.use(errorHandler);

export default app;

