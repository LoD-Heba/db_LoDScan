import express from 'express';
import cors from 'cors'; // Asegúrate de tener instalado el paquete cors
import router from './routes';
import connectDB from './config/db';

connectDB();
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solo este origen
  credentials: true, // Permite enviar cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Métodos permitidos
}));

app.use(express.json());
app.use('/api', router);

export default app;