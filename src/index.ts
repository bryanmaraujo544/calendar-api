import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import errorHandler from './app/middlewares/errorHandler';

import { router as routes } from './routes';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running on port 5000'));
