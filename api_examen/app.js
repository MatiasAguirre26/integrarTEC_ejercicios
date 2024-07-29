import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { userRoutes } from "./routes/userRouter.js";
import { rewardRoutes } from './routes/rewardRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use('/api', userRoutes(), rewardRoutes(), rewardRedemptionRoutes(), recyclingActivityRoutes(), pointRoutes())
app.use('/auth', authRouter); // Usar authRouter
app.use(errorHandler)

app.listen(SERVER_PORT, ()=> {
    console.log(`servidor levantado en ${SERVER_PORT}`)
})
