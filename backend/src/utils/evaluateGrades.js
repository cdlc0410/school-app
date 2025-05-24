/**
 * @file Funciones para la evaluación de calificaciones de estudiantes.
 * @description Este archivo contiene utilidades para recalcular y evaluar las calificaciones
 * de los estudiantes, determinando su estado de aprobación y un mensaje descriptivo.
 * @author Lav
 */

/**
 * @typedef {import("../db/students/studentsData.js").Student} Student
 */

import { showStudents } from "../utils/studentsUtils.js"; // Importa la función para mostrar información del estudiante.

/**
 * Recalcula las calificaciones de un grupo de estudiantes asignándoles una nueva nota
 * aleatoria entre 1 y 100, redondeada a dos decimales.
 * @param {Student[]} students - Un array de objetos de estudiantes.
 * @returns {void} Esta función modifica el array de estudiantes directamente (por referencia),
 * actualizando la propiedad `grade` de cada estudiante.
 */
export function recalculateGrades(students) {
    students.forEach(student => {
        let newGrade = Math.random() * (100 - 1) + 1; // Genera un número aleatorio entre 1 y 100.
        // Asigna la nueva calificación redondeada a dos decimales.
        student.grade = parseFloat(newGrade.toFixed(2));
    });
}

/**
 * Evalúa las calificaciones de un grupo de estudiantes para determinar su estado de aprobación
 * y asignar un mensaje descriptivo de la calificación.
 * Imprime la información de cada estudiante evaluado en la consola.
 * @param {Student[]} students - Un array de objetos de estudiantes.
 * @returns {void} Esta función modifica el array de estudiantes directamente (por referencia),
 * actualizando las propiedades `approved` y `gradeMsg` de cada estudiante.
 */
export function evaluateStudent(students) {
    students.forEach(student => {
        let gradeMsg; // Variable para almacenar el mensaje de calificación.

        // Lógica de evaluación de la calificación
        if (student.grade < 70) {
            gradeMsg = `Ha reprobado`;
            student.approved = false;
        } else { // Si la calificación es >= 70
            student.approved = true;
            if (student.grade >= 90) {
                gradeMsg = `Ha aprobado con Distinción`;
            } else { // Si la calificación está entre 70 y 89.99
                gradeMsg = `Ha aprobado`;
            }
        }
        // Asigna el mensaje de calificación al estudiante.
        student.gradeMsg = gradeMsg;
    });
}