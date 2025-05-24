/**
 * @file Datos de los estudiantes de la escuela.
 * @description Este archivo contiene un array de objetos, donde cada objeto representa
 * a un estudiante con sus datos personales, calificaciones y estado de aprobación.
 * @author Lav
 */

/**
 * @typedef {object} Student
 * @property {number} id - Identificador único del estudiante.
 * @property {string} first_name - Primer nombre del estudiante.
 * @property {string} last_name - Apellido del estudiante.
 * @property {number} grade - Calificación numérica del estudiante (0-100).
 * @property {boolean} approved - Indica si el estudiante ha aprobado o no.
 * @property {string} dob - Fecha de nacimiento del estudiante en formato 'YYYY-MM-DD'.
 * @property {number} age - Edad actual del estudiante.
 * @property {string} gradeMsg - Mensaje descriptivo del estado de la calificación (ej. "Ha aprobado").
 */

/**
 * Array de objetos que representa a todos los estudiantes de la escuela.
 * @type {Student[]}
 */
const STUDENTS = [
  {
    "id": 1,
    "first_name": "Dody",
    "last_name": "Ree",
    "grade": 95.98,
    "approved": true,
    "dob": "2010-03-27",
    "age": 15,
    "gradeMsg": "Ha aprobado con Distinción"
  },
  {
    "id": 2,
    "first_name": "Darcy",
    "last_name": "Raffin",
    "grade": 84.02,
    "approved": true,
    "dob": "2011-02-18",
    "age": 14,
    "gradeMsg": "Ha aprobado"
  },
  {
    "id": 3,
    "first_name": "Salomon",
    "last_name": "Bovis",
    "grade": 24.73,
    "approved": false,
    "dob": "2010-11-13",
    "age": 15,
    "gradeMsg": "Ha reprobado"
  },
  {
    "id": 4,
    "first_name": "Karlan",
    "last_name": "Schrieves",
    "grade": 12.75,
    "approved": false,
    "dob": "2009-04-01",
    "age": 16,
    "gradeMsg": "Ha reprobado"
  },
  {
    "id": 5,
    "first_name": "Mirabelle",
    "last_name": "Jillings",
    "grade": 87.14,
    "approved": true,
    "dob": "2009-06-09",
    "age": 16,
    "gradeMsg": "Ha aprobado"
  },
  {
    "id": 6,
    "first_name": "Julissa",
    "last_name": "Rooksby",
    "grade": 28.31,
    "approved": false,
    "dob": "2010-09-15",
    "age": 15,
    "gradeMsg": "Ha reprobado"
  },
  {
    "id": 7,
    "first_name": "Rutter",
    "last_name": "Janikowski",
    "grade": 37.74,
    "approved": false,
    "dob": "2010-08-07",
    "age": 15,
    "gradeMsg": "Ha reprobado"
  },
  {
    "id": 8,
    "first_name": "Nance",
    "last_name": "Waterland",
    "grade": 59.09,
    "approved": false,
    "dob": "2011-06-20",
    "age": 14,
    "gradeMsg": "Ha reprobado"
  },
  {
    "id": 9,
    "first_name": "Carlene",
    "last_name": "Rowles",
    "grade": 63.8,
    "approved": false,
    "dob": "2010-05-21",
    "age": 15,
    "gradeMsg": "Ha reprobado"
  },
  {
    "id": 10,
    "first_name": "Fredrika",
    "last_name": "Pearcehouse",
    "grade": 76.92,
    "approved": true,
    "dob": "2011-03-13",
    "age": 14,
    "gradeMsg": "Ha aprobado"
  }
]

export default STUDENTS;