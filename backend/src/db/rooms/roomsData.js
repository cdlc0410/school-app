/**
 * @file Datos de las aulas (salas) de la escuela.
 * @description Este archivo contiene un array de objetos, donde cada objeto representa
 * un aula con su identificador único y su nombre.
 * @author Lav
 */

/**
 * @typedef {object} Room
 * @property {number} id - Identificador único del aula.
 * @property {string} name - Nombre del aula (ej. "Languages", "Mathematics").
 */

/**
 * Array de objetos que representa todas las aulas disponibles en la escuela.
 * @type {Room[]}
 */
const ROOMS = [
    {
        "id": 1,
        "name": "Languages"
    },
    {
        "id": 2,
        "name": "Mathematics"
    },
    {
        "id": 3,
        "name": "Sciences"
    }
]

export default ROOMS;