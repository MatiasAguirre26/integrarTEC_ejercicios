// Importamos los módulos necesarios
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importamos las rutas de los diferentes componentes de la aplicación
import { userRoutes } from "./routes/userRouter.js";
import { rewardRoutes } from './routes/rewardRoutes.js';
import { rewardRedemptionRoutes } from './routes/rewardRedemptionRoutes.js';
import { recyclingActivityRoutes } from './routes/recyclingActivityRoutes.js';
import { authRoutes} from "./routes/authRoutes.js"
import { pointRoutes } from './routes/pointRoutes.js';

// Importamos el middleware para el manejo de errores
import errorHandler from './middlewares/errorHandler.js';

//Cargamos las variables de entorno 
dotenv.config();

// Definimos el puerto del servidor, utilizando el valor de la variable de entorno o 3000 por defecto
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Creamos una instancia de la aplicación Express
const app = express();

// Configuramos CORS para permitir solicitudes desde cualquier origen y con los métodos especificados
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))

// Middleware para parsear cuerpos de solicitudes en formato JSON 
app.use(express.json())

// Ruta para la raíz del sitio
app.get('/', (_req, res) => {
    res.send('Inicio!');
  });

// Configuramos las rutas de la API
app.use('/api', userRoutes(), rewardRoutes(), rewardRedemptionRoutes(), recyclingActivityRoutes(), pointRoutes())

// Configuramos las rutas de autenticación
app.use('/auth', authRoutes());

//Middleware para el manejo de errores
app.use(errorHandler)

// Iniciamos el servidor en el puerto especificado
app.listen(SERVER_PORT, ()=> {
    console.log(`servidor levantado en ${SERVER_PORT}`)
})

