import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createLogger, format, transports } from 'winston';
import userRoutes from './routes/userRoutes.js';

// Configuración inicial
dotenv.config();

// Configuración del logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

// Crear aplicación Express
const app = express();

// Configuración de red
const LOCAL_IP = '192.168.20.30';
const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Configuración de CORS
const corsOptions = {
  origin: [
    `http://${LOCAL_IP}:8100`,
    'http://localhost:8100',
    'http://localhost:4200'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de solicitudes
if (ENVIRONMENT === 'development') {
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} from ${req.ip}`);
    next();
  });
}

// Rutas API
app.use('/api/users', userRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: ENVIRONMENT,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejo de errores 404
app.use((req, res) => {
  logger.warn(`404 - Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Error handler global
app.use((err, req, res, next) => {
  logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  logger.error(err.stack);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: ENVIRONMENT === 'production' ? 'Something went wrong' : err.message,
    ...(ENVIRONMENT !== 'production' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(PORT, LOCAL_IP, () => {
  logger.info(`Server running in ${ENVIRONMENT} mode`);
  logger.info(`Local: http://localhost:${PORT}`);
  logger.info(`Network: http://${LOCAL_IP}:${PORT}`);
  logger.info(`API Base: http://${LOCAL_IP}:${PORT}/api`);
});