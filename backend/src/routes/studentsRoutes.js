// backend/routes/studentsRoutes.js
import express from 'express';

// Controladores
import {
    getAllStudents,
    getStudentById,
    evaluateAllStudents,
    getRoomMessages
} from '../controllers/studentController.js';

// Router
const studentsRoutes = express.Router();

// Rutas

studentsRoutes.post('/evaluate', evaluateAllStudents);

studentsRoutes.get('/messages', getRoomMessages);

// Rutas Generales

studentsRoutes.get('/', getAllStudents);

studentsRoutes.get('/:id', getStudentById);

export default studentsRoutes;