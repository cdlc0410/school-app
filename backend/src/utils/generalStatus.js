/**
 * @file Contiene funciones para calcular y obtener el estado general de la escuela.
 * @description Este módulo proporciona una función para analizar los datos de la escuela
 * y los estudiantes, calculando métricas clave como el número de aprobados/reprobados,
 * porcentajes y estadísticas de edad.
 * @author Tu Nombre (o el nombre de quien lo escribió)
 */

// Ya no es necesario importar SCHOOL y STUDENTS aquí, ya que se pasan como parámetros
// import SCHOOL from "../db/school.js";
// import STUDENTS from "../db/students/studentsData.js";

/**
 * @typedef {import('../../src/db/students/studentsData.js').Student} Student
 * @typedef {import('../../src/db/school.js').School} School
 */

/**
 * Calcula y devuelve un objeto con el estado general de la escuela, incluyendo estadísticas de estudiantes.
 *
 * @param {School} school - Un objeto que contiene la información de la escuela (ej. nombre, año de inicio).
 * @param {Student[]} students - Un array de objetos de estudiantes, cada uno con propiedades como `approved` y `age`.
 * @returns {object} Un objeto que representa el estado general de la escuela con las siguientes propiedades:
 * @property {string} schoolName - El nombre de la escuela.
 * @property {number} sinceYear - El año de fundación o inicio de la escuela. (¡Excelente adición!)
 * @property {number} currentYear - El año actual de operación de la escuela.
 * @property {number} totalStudents - El número total de estudiantes.
 * @property {number} studentsApproved - El número de estudiantes aprobados.
 * @property {number} studentsDisapproved - El número de estudiantes reprobados.
 * @property {string} approvedPercentage - El porcentaje de estudiantes aprobados, formateado a dos decimales con '%'.
 * @property {string} disapprovedPercentage - El porcentaje de estudiantes reprobados, formateado a dos decimales con '%'.
 * @property {object} studentAges - Un objeto que contiene estadísticas de edad de los estudiantes.
 * @property {number} studentAges.youngest - La edad del estudiante más joven.
 * @property {number} studentAges.oldest - La edad del estudiante más viejo.
 * @property {number} studentAges.average - La edad promedio de los estudiantes, redondeada al entero más cercano.
 */
function generalStatus(school, students) {

    let totalStudents = students.length;
    let approvedStudentsCount = 0;
    let disapprovedStudentsCount = 0;

    // Inicialización de edades con valores sensatos
    // Si no hay estudiantes, oldestAge debería seguir siendo 0, youngestAge quizás Infinity o 0 si no hay estudiantes
    // Una alternativa es inicializarlos solo si hay estudiantes, o darles un valor por defecto si no los hay.
    let youngestAge = Infinity; // Mejor inicializar con infinito para asegurar que cualquier edad real sea menor
    let oldestAge = -Infinity; // Mejor inicializar con -infinito para asegurar que cualquier edad real sea mayor
    let averageAge = 0;

    students.forEach(student => {
        // Tu lógica de conteo de aprobados/reprobados es correcta.
        if (student.approved === true) { // Usar '===' para una comparación estricta de tipo y valor
            approvedStudentsCount += 1;
        } else {
            disapprovedStudentsCount += 1;
        }

        // Tu lógica para la edad más vieja es correcta.
        if (student.age > oldestAge) {
            oldestAge = student.age;
        }

        // Tu lógica para la edad más joven es correcta.
        if (student.age < youngestAge) {
            youngestAge = student.age;
        }

        averageAge += student.age;
    });

    // Manejar el caso de que no haya estudiantes para evitar división por cero
    if (totalStudents > 0) {
        averageAge = averageAge / totalStudents;
    } else {
        averageAge = 0; // Si no hay estudiantes, el promedio es 0.
        youngestAge = 0; // Si no hay estudiantes, estas deberían ser 0 o un valor nulo/indefinido.
        oldestAge = 0;
    }

    // Los cálculos de porcentajes son correctos.
    // La inicialización a 0 si el contador es 0 ya maneja la división por cero si totalStudents es 0,
    // pero la lógica `if (totalStudents > 0)` en `averageAge` es más explícita.
    let approvedPercentage = (approvedStudentsCount / totalStudents) * 100;
    if (isNaN(approvedPercentage)) approvedPercentage = 0; // Si totalStudents es 0, el resultado es NaN

    let disapprovedPercentage = (disapprovedStudentsCount / totalStudents) * 100;
    if (isNaN(disapprovedPercentage)) disapprovedPercentage = 0; // Si totalStudents es 0, el resultado es NaN


    const schoolStatus = {
        schoolName: school.name,
        sinceYear: school.since, // ¡Excelente adición! Usa la propiedad `since` de tu objeto school.
        currentYear: school.currentYear(),
        totalStudents: totalStudents,
        studentsApproved: approvedStudentsCount, // Renombré a 'studentsApproved' para consistencia con 'studentsDisapproved'
        studentsDisapproved: disapprovedStudentsCount,
        approvedPercentage: approvedPercentage.toFixed(2) + '%',
        disapprovedPercentage: disapprovedPercentage.toFixed(2) + '%',
        studentAges: {
            // Manejar Infinity si no hay estudiantes, o simplemente retornar 0 si no hay
            youngest: youngestAge === Infinity ? 0 : youngestAge, // Si no hay estudiantes, que sea 0
            oldest: oldestAge === -Infinity ? 0 : oldestAge, // Si no hay estudiantes, que sea 0
            average: parseInt(averageAge.toFixed(0)) // Redondeado a entero
        }
    }

    return schoolStatus;
}

export { generalStatus }