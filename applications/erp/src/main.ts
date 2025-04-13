import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
app.use(express.json());

import {sequelize} from './common/models/index.js';
import indexRouter from './routes/index.routes.js';

app.use(indexRouter);

sequelize
  .sync({force: true})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
