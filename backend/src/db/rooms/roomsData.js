/**
 * @file Datos de las aulas (salas) de la escuela.
 * @description Este archivo contiene un array de objetos, donde cada objeto representa
 * un aula con su nombre y su capacitdad.
 * @author Lav
 */

/**
 * @typedef {object} Room
 * @property {string} name - Nombre del aula (ej. "Languages", "Mathematics").
 * @property {number} capacity - Identificador único del aula.
 */

/**
 * Array de objetos que representa todas las aulas disponibles en la escuela.
 * @type {Room[]}
 */
const ROOMS = [
    {
        "name": "Languages",
        "capacity": 0
    },
    {
        "name": "Mathematics",
        "capacity": 0
    },
    {
        "name": "Sciences",
        "capacity": 0
    }
]

export default ROOMS;