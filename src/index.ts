import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import musiRoute from './routes/music';
import user from './routes/userRoute';
import auth from './routes/auth';
dotenv.config();
const app = express();

// middleware que transforma la req.body a un .json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions
const PORT = process.env.PORT || 3000;

const mongo = process.env.MONGODB_URI;

// const dbConfig = {
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT || "3000",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "berserk",
//   database: process.env.DB_NAME || "musitracker",
// };

// MongoDB connection
mongoose
  .connect(mongo as string)
  .then(() => console.log('Connected to mongoDB Atlas'))
  .catch((error) => console.error(error));

app.use('/auth', auth);
app.use('/music', musiRoute);
app.use('/user', user);

app.listen(PORT, () => {
  console.log('[ON] Server running on port ', PORT);
});
