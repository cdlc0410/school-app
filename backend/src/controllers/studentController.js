// backend/src/controllers/studentController.js

// ¡Importa tus modelos de Mongoose!
import Student from '../models/Student.js';
import School from '../models/School.js'; // Importa el modelo School
import Room from '../models/Room.js';     // Importa el modelo Room

// Tus funciones de utilidad (estas seguirán usándose)
import { generalStatus } from '../../src/utils/generalStatus.js';
// Nota: evaluateStudent y createRoomMessage podrían necesitar ajustes internos si esperan arrays planos
// en lugar de documentos Mongoose, pero por ahora asumimos que funcionan con ellos.
// La lógica de evaluateAllStudents ya la adaptamos para guardar individualmente.
import { createRoomMessage } from '../../src/utils/msgRooms.js';

// --- Controladores para Estudiantes (Actualizados para Mongoose) ---

/**
 * @function getAllStudents
 * @description Controlador para obtener todos los estudiantes desde la base de datos.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un array de objetos de estudiantes como respuesta JSON.
 */
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        console.error('Error al obtener todos los estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener estudiantes.' });
    }
};

/**
 * @function getStudentById
 * @description Controlador para obtener un estudiante específico por su ID personalizado desde la base de datos.
 * @param {import('express').Request} req - Objeto de petición de Express. `req.params.id` contiene el ID.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía el objeto estudiante como JSON o un mensaje de error 404.
 */
export const getStudentById = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        if (isNaN(studentId)) {
            return res.status(400).json({ message: 'ID de estudiante no válido.' });
        }
        const student = await Student.findOne({ id: studentId });

        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: `Estudiante con ID ${studentId} no encontrado.` });
        }
    } catch (error) {
        console.error(`Error al obtener estudiante con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el estudiante.' });
    }
};

// --- Controladores para Estado de la Escuela y Operaciones (Actualizados para Mongoose) ---

/**
 * @function getSchoolStatus
 * @description Controlador para obtener el estado general de la escuela.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía el objeto de estado de la escuela como JSON.
 * @note Ahora obtiene los estudiantes y la información de la escuela de la base de datos.
 */
export const getSchoolStatus = async (req, res) => {
    try {
        const students = await Student.find({}); // Obtener estudiantes de la base de datos
        const school = await School.findOne({}); // Obtener la información de la escuela (asumiendo que solo hay un documento)

        if (!school) {
            return res.status(404).json({ message: 'Información de la escuela no encontrada.' });
        }

        // Pasa los estudiantes de la BD y el objeto de la escuela a tu función
        // generalStatus espera un objeto 'school' con un método 'currentYear()'
        // Si el objeto de Mongoose no tiene ese método, necesitas llamarlo como school.currentYear() en el modelo School.js
        // y asegurarte de que `generalStatus` lo acepta.
        // Para `generalStatus`, necesitamos el objeto `school` como antes, con su método.
        // Una solución es pasar solo las propiedades o adaptar generalStatus.
        // Por simplicidad aquí, asumimos que el modelo `School` tiene el método `currentYear` o que generalStatus puede manejarlo.
        const status = generalStatus(school, students);
        res.status(200).json(status);
    } catch (error) {
        console.error('Error al obtener el estado de la escuela:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el estado de la escuela.' });
    }
};

/**
 * @function evaluateAllStudents
 * @description Controlador para evaluar a todos los estudiantes y actualizar sus estados en la base de datos.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un mensaje de éxito y los estudiantes actualizados como JSON.
 * @note Ahora actualiza los estudiantes en la base de datos.
 */
export const evaluateAllStudents = async (req, res) => {
    try {
        const studentsToEvaluate = await Student.find({}); // Obtener todos los estudiantes de la BD

        const updatedStudents = [];
        for (let student of studentsToEvaluate) {
            // Generar nueva calificación
            let newGrade = Math.random() * (100 - 1) + 1;
            student.grade = parseFloat(newGrade.toFixed(2));

            // Lógica de evaluación para el estado (aprobado/reprobado)
            let gradeMsg;
            if (student.grade < 70) {
                gradeMsg = `Ha reprobado`;
                student.approved = false;
            } else {
                student.approved = true;
                if (student.grade >= 90) {
                    gradeMsg = `Ha aprobado con Distinción`;
                } else {
                    gradeMsg = `Ha aprobado`;
                }
            }
            student.gradeMsg = gradeMsg;

            await student.save(); // Guarda el estudiante actualizado en la base de datos
            updatedStudents.push(student);
        }

        res.status(200).json({
            message: 'Estudiantes evaluados y estado actualizado en la base de datos.',
            students: updatedStudents
        });
    } catch (error) {
        console.error('Error al evaluar y actualizar estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor al evaluar estudiantes.' });
    }
};

/**
 * @function getRoomMessages
 * @description Controlador para generar mensajes de bienvenida a las aulas para todos los estudiantes desde la base de datos.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un array de strings con los mensajes de bienvenida como JSON.
 * @note Ahora obtiene los estudiantes de la base de datos.
 */
export const getRoomMessages = async (req, res) => {
    try {
        const students = await Student.find({}); // Obtener estudiantes de la base de datos
        const messages = [];
        // createRoomMessage ya no necesita ROOMS_DATA, obtiene un nombre de habitación aleatorio
        // directamente usando el modelo Room.
        const rooms = await Room.find({}); // Obtener las habitaciones de la BD

        if (rooms.length === 0) {
            return res.status(404).json({ message: 'No se encontraron aulas para generar mensajes.' });
        }

        // Adaptar createRoomMessage para que use los nombres de las rooms de la BD
        // En src/utils/msgRooms.js, la función getRandomRoomName() debería ser modificada para usar el modelo Room.
        // Por ahora, asumimos que createRoomMessage puede ser adaptado o se le puede pasar el array de nombres.
        // Para este ejemplo, simplificamos y pasamos un array de nombres de habitaciones.
        const roomNames = rooms.map(room => room.name);
        const createRoomMessageWithRooms = (studentName) => {
            const randomRoomName = roomNames[Math.floor(Math.random() * roomNames.length)];
            return `Hola ${studentName}, bienvenid@ a: ${randomRoomName}.`;
        };


        students.forEach(student => {
            let studentFullName = `${student.first_name} ${student.last_name}`;
            messages.push(createRoomMessageWithRooms(studentFullName));
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes de las aulas:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener mensajes de las aulas.' });
    }
};