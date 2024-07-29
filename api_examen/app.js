import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { userRoutes } from "./routes/userRouter.js";
import { rewardRoutes } from './routes/rewardRoutes.js';
import { rewardRedemptionRoutes } from './routes/rewardRedemptionRoutes.js';
import { recyclingActivityRoutes } from './routes/recyclingActivityRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { pointRoutes } from './routes/pointRoutes.js';

import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))
app.use(express.json())


app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

app.use('/api', userRoutes(), rewardRoutes(), rewardRedemptionRoutes(), recyclingActivityRoutes(), pointRoutes())
app.use('/auth', authRouter());
app.use(errorHandler)

app.listen(SERVER_PORT, SERVER_HOST, () => console.log("Servidor levantado en el puerto: " , SERVER_PORT))
// app.listen(SERVER_PORT, ()=> {
//     console.log(`servidor levantado en ${SERVER_PORT}`)
// })

