// backend/routes/schoolRoutes.js
import express from 'express';

// Controladores
import { getSchoolStatus } from '../controllers/studentController.js';

// Router
const schoolRoutes = express.Router();

// Rutas

// No hay aun

// Ruta General
schoolRoutes.get("/", getSchoolStatus);

export default schoolRoutes;