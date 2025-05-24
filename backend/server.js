// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
// Importa tus controladores desde la nueva carpeta
import {
    getAllStudents,
    getStudentById,
    getSchoolStatus,
    evaluateAllStudents,
    getRoomMessages
} from './src/controllers/studentController.js'; // Asegúrate de que la ruta sea correcta

// Carga las variables de entorno desde .env
dotenv.config();

const app = express(); // Crea la instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Define el puerto

// --- Middleware Globales ---
// Middleware para parsear el cuerpo de las peticiones entrantes en formato JSON.
// Esto es ESENCIAL si esperas recibir datos JSON en peticiones POST/PUT/PATCH.
app.use(express.json());

// --- Definición de Rutas API ---

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor School Logic!');
});

// Rutas para estudiantes
// !!! IMPORTANTE: Las rutas más ESPECÍFICAS van ANTES que las más GENERALES !!!

// Rutas para el estado de la escuela y operaciones (Mover estas antes de /api/students/:id)
app.get('/api/school-status', getSchoolStatus);
app.get('/api/students/messages', getRoomMessages); // Esta ruta debe ir antes de /api/students/:id
app.post('/api/students/evaluate', evaluateAllStudents); // Esta ruta, aunque es POST, también la movería aquí para orden lógico, o ponerla junto a las otras de /api/students/...

// Rutas para la colección de estudiantes
app.get('/api/students', getAllStudents); // GET /api/students -> Obtener todos los estudiantes

// Ruta para un estudiante específico por ID (Esta es la más GENERAL de las de /api/students)
app.get('/api/students/:id', getStudentById); // GET /api/students/:id -> Obtener un estudiante por ID

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});