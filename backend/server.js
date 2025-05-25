// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
const MONGODB_URI = process.env.MONGODB_URI; // Obtén la URI de la BD desde .env

// --- Middleware Globales ---
// Middleware para parsear el cuerpo de las peticiones entrantes en formato JSON.
// Esto es ESENCIAL si esperas recibir datos JSON en peticiones POST/PUT/PATCH.
app.use(express.json());
// --- Conexión a MongoDB ---
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.clear()
        console.log('Conectado a MongoDB Atlas');
        // SOLO inicia el servidor Express si la conexión a la base de datos es exitosa
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB Atlas:', err);
        process.exit(1); // Sale de la aplicación si hay un error de conexión a la BD
    });

// --- Definición de Rutas API (sin cambios aquí, se mantienen iguales) ---
app.get('/', (req, res) => {
  res.send('<h1>¡Hola desde el servidor School Logic!</h1> <ul><b>APIs:</b><li><a href="./api/school-status">school-status</a></li><li><a href="./api/students">students</a></li></ul>');
});

app.get('/api/school-status', getSchoolStatus);
app.get('/api/students/messages', getRoomMessages);
app.post('/api/students/evaluate', evaluateAllStudents);
app.get('/api/students', getAllStudents);
app.get('/api/students/:id', getStudentById);