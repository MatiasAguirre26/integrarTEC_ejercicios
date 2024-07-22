import express from 'express';
import dotenv from 'dotenv';
// import { expressjwt as ejwt } from 'express-jwt'
import { userRoutes } from "./routes/userRouter.js";
import errorHandler from './middlewares/errorHandler.js';


dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();
app.use(express.json()) //Para que Express entienda cuando le llega carga en formato JSON y lo convierta a un objeto JS(para poder usarlo con el req.body)

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use('/api', userRoutes()) //Para usar la ruta 
app.use(errorHandler)//Middleware para mostrar mensaje de error

app.listen(SERVER_PORT, ()=> {
    console.log(`servidor levantado en ${SERVER_PORT}`)
})
