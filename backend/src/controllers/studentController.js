// backend/src/controllers/studentController.js

// JSDoc para importar el tipo Student (para mejor autocompletado y validación)
/**
 * @typedef {import('../db/students/studentsData.js').Student} Student
 * @typedef {import('../db/school.js').School} School
 */

// Importa tus datos y funciones existentes
import STUDENTS from '../db/students/studentsData.js';
import SCHOOL from '../db/school.js';
import { generalStatus } from '../utils/generalStatus.js';
import { evaluateStudent } from '../utils/evaluateGrades.js';
import { createRoomMessage } from '../utils/msgRooms.js';

// --- Controladores para Estudiantes ---

/**
 * @function getAllStudents
 * @description Controlador para obtener todos los estudiantes.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un array de objetos de estudiantes como respuesta JSON.
 */
export const getAllStudents = (req, res) => {
    // En una aplicación real, aquí interactuarías con una base de datos.
    // Por ahora, simplemente devolvemos los datos del array STUDENTS.
    res.status(200).json(STUDENTS); // Envía los estudiantes como JSON con un estado 200 (OK)
};

/**
 * @function getStudentById
 * @description Controlador para obtener un estudiante específico por su ID.
 * @param {import('express').Request} req - Objeto de petición de Express. `req.params.id` contiene el ID.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía el objeto estudiante como JSON o un mensaje de error 404.
 */
export const getStudentById = (req, res) => {
    const studentId = parseInt(req.params.id); // req.params.id siempre es un string, conviértelo a número
    const student = STUDENTS.find(s => s.id === studentId);

    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: `Estudiante con ID ${studentId} no encontrado.` });
    }
};

// --- Controladores para Estado de la Escuela y Operaciones ---

/**
 * @function getSchoolStatus
 * @description Controlador para obtener el estado general de la escuela.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía el objeto de estado de la escuela como JSON.
 * @note Asegúrate de que `generalStatus` en `src/utils/generalStatus.js` devuelva el objeto de estado y no imprima en consola.
 */
export const getSchoolStatus = (req, res) => {
    // Ejecuta tu lógica existente para obtener el estado general.
    const status = generalStatus(SCHOOL, STUDENTS); // Asumiendo que generalStatus ahora devuelve el objeto
    res.status(200).json(status); // Envía el estado como JSON
};

/**
 * @function evaluateAllStudents
 * @description Controlador para evaluar a todos los estudiantes y obtener sus estados actualizados.
 * Esta función modifica el array `STUDENTS` en memoria.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un mensaje de éxito y los estudiantes actualizados como JSON.
 * @note Asegúrate de que `evaluateStudent` en `src/utils/evaluateGrades.js` no imprima en consola ni llame a `showStudents`.
 */
export const evaluateAllStudents = (req, res) => {
    // NOTA IMPORTANTE: evaluateStudent modifica el array STUDENTS directamente.
    // En un entorno real con persistencia, esto se haría persistiendo en una base de datos.
    // Por simplicidad por ahora, llamamos a la función que modifica `STUDENTS` directamente.
    evaluateStudent(STUDENTS); // Esta función ya no debería imprimir nada en consola

    res.status(200).json({
        message: 'Estudiantes evaluados y estado actualizado.',
        students: STUDENTS // Opcionalmente, devuelve los estudiantes actualizados
    });
};

/**
 * @function getRoomMessages
 * @description Controlador para generar mensajes de bienvenida a las aulas para todos los estudiantes.
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un array de strings con los mensajes de bienvenida como JSON.
 * @note Asegúrate de que `createRoomMessage` en `src/utils/msgRooms.js` no imprima en consola.
 */
export const getRoomMessages = (req, res) => {
    const messages = [];
    const generateWelcomeMessage = createRoomMessage(); // Obtiene el closure una vez

    STUDENTS.forEach(student => {
        let studentFullName = `${student.first_name} ${student.last_name}`;
        messages.push(generateWelcomeMessage(studentFullName));
    });

    res.status(200).json(messages); // Devuelve todos los mensajes como JSON
};