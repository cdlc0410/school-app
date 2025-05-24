/**
 * @file Utilidades para la gestión de estudiantes.
 * @description Este archivo contiene funciones auxiliares relacionadas con los estudiantes,
 * como la actualización de su edad y la visualización de su información.
 * @author Lav
 */

/**
 * @typedef {import("../db/students/studentsData.js").Student} Student
 */

/**
 * Actualiza la edad de cada estudiante en el array basándose en su fecha de nacimiento
 * y el año actual.
 * @param {Student[]} students - Un array de objetos de estudiantes.
 * @returns {void} Esta función modifica el array de estudiantes directamente (por referencia).
 */
export function updateAgeStudents(students) {
    students.forEach(student => {
        const TODAY = new Date();
        let studentDOB = new Date(student.dob);
        // Calcula la edad basándose en la diferencia de años.
        student.age = TODAY.getFullYear() - studentDOB.getFullYear();
    });}

/**
 * Muestra la información detallada de un estudiante en la consola.
 * @param {Student} student - El objeto del estudiante cuya información se va a mostrar.
 * @returns {void} Esta función no devuelve ningún valor; solo imprime en la consola.
 */
export function showStudents(student) {
    console.log(`---- Student Info ----\n`);
    console.log(`Name    : ${student.first_name}`);
    console.log(`Lastname: ${student.last_name}`);
    console.log(`Age     : ${student.age}`);
    console.log(`Grade   : ${student.grade}`);
    console.log(`Approved: ${student.approved}\n`);
}